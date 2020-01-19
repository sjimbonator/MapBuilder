import { Component, OnInit } from '@angular/core';
import { LayerService } from 'src/app/services/layer.service';

@Component({
  selector: 'app-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.css']
})
export class LayerEditorComponent implements OnInit {

  fileError : boolean = false;
  constructor(private layerService : LayerService) { }

  ngOnInit() {
    this.layerService.clearCurrentLayer();
  }

  needLayer() : boolean 
  { 
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
      //code to upload image to backend
      //code to get new layer object with image url
      //code to put the new layer in memory
    }
    else{ this.fileError = true; }
    
  }
  
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
