import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/app/services/tool.service';
import { ToolOptions } from 'src/app/models/toolOptions';
import { Marker } from 'src/app/models/marker';
import { Layer } from 'src/app/models/layer';
import { Observable } from 'rxjs';
import { LayerService } from 'src/app/services/layer.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  layers: Observable<Layer[]>;
  
  options : ToolOptions = new ToolOptions;
  pushOptions(): void { this.toolService.setCurrentOptions(this.options); }
  constructor(private toolService : ToolService, private layerService : LayerService) { }
  
  ngOnInit() {
    this.pushOptions();
    this.layerService.currentLayers.subscribe(x => this.layers = x);
  }

  addClick() { this.options.activateAdd(); this.pushOptions(); }
  removeClick() { this.options.activateRemove(); this.pushOptions(); }
  editClick() { this.options.activateEdit(); this.pushOptions(); }
  selectClick() { this.options.activateSelect(); this.pushOptions(); }
}
