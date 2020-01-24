import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { LayerService } from 'src/app/services/layer.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { FileDesc } from 'src/app/models/fileDesc';
import { Layer } from 'src/app/models/layer';
import { extent, proj, Feature, geom  } from 'openlayers';
import { MarkerService } from 'src/app/services/marker.service';
import { Observable, ReplaySubject } from 'rxjs';
import { Marker } from 'src/app/models/marker';

@Component({
  selector: 'app-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.css']
})
export class LayerEditorComponent implements OnInit {
  Markers : Observable<Marker[]>;
  constructor(private changeDetectorRef: ChangeDetectorRef,private layerService : LayerService, private markerService : MarkerService, private imgService : ImageUploadService) { }

  private currLayer: Layer;
  ngOnInit()
  {  
    this.layerService.clearCurrentLayer();
    this.layerService.getCurrentLayer().subscribe( x => {  if(x.id!=undefined){this.setAolExtent(x);} else {this.currLayer = x; this.changeDetectorRef.detectChanges();}  } ) 
  }

  fileError : boolean = false;

  //variables for angular openlayers
  extent: ol.Extent = [0, 0, 1920, 1080];

  po: olx.ProjectionOptions = {
    code: 'xkcd-image',
    units: 'pixels',
    extent: [0, 0, 1920, 1080]
  }

  projection = new proj.Projection(this.po);


  setAolExtent(layer:Layer)
  {
    let loaded : ReplaySubject<number[]> = new ReplaySubject<number[]>();
    loaded.subscribe(x => this.afterLoad(x[0],x[1],layer) );
    
    let img:HTMLImageElement = new Image();
    img.onload = function(){loaded.next([img.width,img.height]);}
    img.src=layer.imageUrl;
    
  }

  afterLoad(width:number, height:number, layer : Layer)
    {
      this.extent= [0, 0, width, height];
      this.po = {
        code: 'xkcd-image',
        units: 'pixels',
        extent: [0, 0, width, height]
      }
      this.currLayer = layer;
      this.getMarkers();
      this.changeDetectorRef.detectChanges();
    }
 
  getCenter = ext =>  extent.getCenter(ext)

  endDrawing(feat: Feature) {
    const point = feat.getGeometry() as geom.Point;
    let coords : number[] = point.getCoordinates();
    console.log(coords);
    let marker : Marker = new Marker();
    marker.x=coords[0];
    marker.y=coords[1];
    this.markerService.postMarker(marker).subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log("biem")
    );
  }

  needLayer() : boolean 
  { 
    if(this.currLayer == undefined) {return true;}
    if(this.currLayer.name == undefined) {return true;}
    else {return false;}
  }
  needImg(): boolean 
  {
    if(this.needLayer()){return false;}
    else 
    {
      if(this.currLayer.imageUrl == undefined){return true;}
      else{return false;}
    }
  }

  getMarkers():void {this.Markers = this.markerService.getMarkers();}

  img: File;
  
  handleImage(file: File) {
    if(this.isFileImage(file))
    {
      this.img = file;
      
      console.log(this.img.name + " " + this.img.type);

      let fileDesc : FileDesc;
      //Posts the image file then updates currentlayer with image url
      this.imgService.postImage(this.img).subscribe(
        x => fileDesc = x,
        err => console.log(err),
        () => this.updateLayerImgUrl(fileDesc)
      );
      
    }
    else{ this.fileError = true; }
    
  }
  //code to get new layer object with image url
  updateLayerImgUrl(fileDesc:FileDesc){
  let layer : Layer = this.currLayer;
  layer.imageUrl = fileDesc.filePath;
  this.layerService.setCurrentLayer(layer)
  this.layerService.putLayer(layer).subscribe(
    x => layer = x,
    err => console.log(err),
    () => {
      //this.layerService.setCurrentLayer(layer);
    }
  );
  }
  
  //Checks if a file is an image
  isFileImage(file : File) : boolean {
      const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  
      return acceptedImageTypes.includes(file['type'])
  }
  onFileDropped($event)
  {
    this.handleImage($event);
  }
  fileBrowseHandler(files) {
    this.handleImage(files);
  }

}
