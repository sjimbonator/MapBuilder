import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.css']
})
export class LayerEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  files: any[] = [];
  
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);    
      console.log(item);
    }
  }
  onFileDropped($event)
  {
    this.prepareFilesList($event);
  }
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

}
