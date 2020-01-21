import { Component, OnInit } from '@angular/core';
import { LayerService } from 'src/app/services/layer.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { FileDesc } from 'src/app/models/fileDesc';
import { Layer } from 'src/app/models/layer';
import { extent, proj } from 'openlayers';

@Component({
  selector: 'app-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.css']
})
export class LayerEditorComponent implements OnInit {

  fileError : boolean = false;
  constructor(private layerService : LayerService, private imgService : ImageUploadService) { }

  ngOnInit() {
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
      else{return false;}
    }
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

  public zoom = 5;
  public opacity = 1.0;
   extent: ol.Extent = [0, 0, 1024, 968];

  po: olx.ProjectionOptions = {
    code: 'xkcd-image',
    units: 'pixels',
    extent: [0, 0, 1024, 968]
  }

  projection = new proj.Projection(this.po);
 
  getCenter = ext =>  extent.getCenter(ext)

}
