import { Component, OnInit } from '@angular/core';
import { LayerService } from 'src/app/services/layer.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { FileDesc } from 'src/app/models/fileDesc';
import { Layer } from 'src/app/models/layer';
import { extent, proj, Feature, geom  } from 'openlayers';
import { MarkerService } from 'src/app/services/marker.service';
import { Observable } from 'rxjs';
import { Marker } from 'src/app/models/marker';

@Component({
  selector: 'app-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.css']
})
export class LayerEditorComponent implements OnInit {

  constructor(private layerService : LayerService, private markerService : MarkerService, private imgService : ImageUploadService) { }

  fileError : boolean = false;
  imageurl : string = undefined;

  //variables for angular openlayers
  public zoom = 5;
  public opacity = 1.0;

  extent: ol.Extent = [0, 0, 1000, 1000];

  po: olx.ProjectionOptions = {
    code: 'xkcd-image',
    units: 'pixels',
    extent: [0, 0, 1000, 1000]
  }

  projection = new proj.Projection(this.po);
 
  getCenter = ext =>  extent.getCenter(ext)

  endDrawing(feat: Feature) {
    const point = feat.getGeometry() as geom.Point;
    let coords : number[] = point.getCoordinates();
    console.log(coords);
    let marker : Marker = new Marker();
    marker.x=coords[0];
    marker.y=coords[1];
    this.markerService.postMarker(marker);
  }

  ngOnInit() {
    //Clears current layer so the "canvas" is empty when you start editing a map until you select a layer
    this.layerService.clearCurrentLayer();
  }

  needLayer() : boolean 
  { 
    if(this.layerService.currentLayer == undefined) { return true;}
    if(this.layerService.currentLayer.name == undefined) {return true;}
    else {return false;}
  }
  needImg(): boolean 
  {
    if(this.needLayer()){return false;}
    else 
    {
      if(this.layerService.currentLayer.imageUrl == undefined){return true;}
      else{this.imageurl = this.layerService.currentLayer.imageUrl; return false;}
    }
  }

  getMarkers():Observable<Marker[]> {return this.markerService.getMarkers();}

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
  let layer : Layer = this.layerService.currentLayer;
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
