import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { LayerService } from 'src/app/services/layer.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { FileDesc } from 'src/app/models/fileDesc';
import { Layer } from 'src/app/models/layer';
import { extent, proj, Feature, geom, MapBrowserEvent  } from 'openlayers';
import { MarkerService } from 'src/app/services/marker.service';
import { Observable, ReplaySubject } from 'rxjs';
import { Marker } from 'src/app/models/marker';
import { ToolService } from 'src/app/services/tool.service';
import { ToolOptions } from 'src/app/models/toolOptions';

@Component({
  selector: 'app-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.css']
})
export class LayerEditorComponent implements OnInit {
  Markers : Observable<Marker[]>;
  storedMarkers : Marker[];
  CurrentToolOptions : ToolOptions;
  private currLayer: Layer;

  constructor(private changeDetectorRef: ChangeDetectorRef,private layerService : LayerService, private markerService : MarkerService, private imgService : ImageUploadService, private toolService : ToolService) { }
  
  ngOnInit()
  {  
    this.layerService.clearCurrentLayer();
    //Gets called everytime a new current layer is set in the layer service.
    //Updates the view based on what's in the layer.
    this.layerService.getCurrentLayer().subscribe( x => {  if(x.id!=undefined){this.setOpenLayersVars(x);} else {this.currLayer = x;}  } ) 
    //Sets CurrentToolOptions everytime its updated in external component.
    this.toolService.getCurrentOptions().subscribe( x => { this.CurrentToolOptions=x; })
  }

  fileError : boolean = false;

  //variables for angular openlayers
  zoom: number = 0;
  center: number[] = [512, 484];
  extent: ol.Extent = [0, 0, 1920, 1080];

  po: olx.ProjectionOptions = {
    code: 'xkcd-image',
    units: 'pixels',
    extent: [0, 0, 1920, 1080]
  }

  projection = new proj.Projection(this.po);

  //Calculates the projection for openlayers based on the size of the image.
  //Sets the currLayer property after its done.
  setOpenLayersVars(layer:Layer)
  {
    let loaded : ReplaySubject<number[]> = new ReplaySubject<number[]>();
    loaded.subscribe(x => this.afterLoad(x[0],x[1],layer) );
    
    let img:HTMLImageElement = new Image();
    img.onload = function(){loaded.next([img.width,img.height]);}
    img.src=layer.imageUrl;
    
  }

  afterLoad(width:number, height:number, layer : Layer)
    {
      this.zoom = 2.2;
      this.center = [width/2,height/2];
      this.extent= [0, 0, width, height];
      this.po = {
        code: 'xkcd-image',
        units: 'pixels',
        extent: [0, 0, width, height]
      }
      this.projection= new proj.Projection(this.po);
      this.currLayer = layer;
      this.getMarkers();
    }
 
  getCenter = ext =>  extent.getCenter(ext)

  onClick(feat: MapBrowserEvent) {
    //store click coords in variable
    let coords : number[] = feat.coordinate;

    //if Add tool is selected
    if(this.CurrentToolOptions.getAdd())
    {
      let marker : Marker = this.CurrentToolOptions.marker;
      marker.x=coords[0];
      marker.y=coords[1];
      this.markerService.postMarker(marker).subscribe(() => this.getMarkers());
    }
    //if Remove tool is selected
    else if(this.CurrentToolOptions.getRemove())
    {
      let marker =this.findMarker(coords);
      if(marker != undefined) 
      { 
        this.markerService.deleteMarker(marker.id).subscribe(() => this.getMarkers());
      }
    }
    //if Edit tool is selected
    else if(this.CurrentToolOptions.getEdit())
    {
      let formMarker: Marker = this.CurrentToolOptions.marker;
      let canvasMarker =this.findMarker(coords);
      if(canvasMarker != undefined) 
      { 
        canvasMarker.imageUrl = formMarker.imageUrl;
        canvasMarker.layerLinkId = formMarker.layerLinkId;
        canvasMarker.hoverText = formMarker.hoverText;
        this.markerService.putMarker(canvasMarker).subscribe(() => this.getMarkers());
      }
    }
    //if Select tool is selected
    else if(this.CurrentToolOptions.getSettings())
    {
      this.findMarker(coords);
    }
    
  }

  findMarker(coords : number[]) : Marker
  {
    if(this.storedMarkers == undefined) return undefined;
    
    for(let marker of this.storedMarkers)
    {
      let xMin : number = coords[0] -10;
      let xMax : number = coords[0] +10;

      let yMin : number = coords[1] -10;
      let yMax : number = coords[1] +10;

      if( (marker.x >= xMin && marker.x <= xMax) && (marker.y >= yMin && marker.y <= yMax) ) { return marker}
    }
    return undefined;
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

  getMarkers():void {
    this.Markers = this.markerService.getMarkers();
    this.storedMarkers = undefined;
    this.Markers.subscribe(x=> this.storedMarkers = x)
  }

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
