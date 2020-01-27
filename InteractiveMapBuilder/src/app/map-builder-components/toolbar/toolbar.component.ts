import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/app/services/tool.service';
import { ToolOptions } from 'src/app/models/toolOptions';
import { Marker } from 'src/app/models/marker';
import { Layer } from 'src/app/models/layer';
import { Observable } from 'rxjs';
import { LayerService } from 'src/app/services/layer.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  layers: Observable<Layer[]>;

  primaryLayerId : number;
  
  updatePrimaryLayer(): void 
  {
    let putMap = this.mapService.currentMap;
    putMap.primaryLayerId = this.primaryLayerId;
    this.mapService.putMap(putMap).subscribe();
  }
  
  options : ToolOptions = new ToolOptions;
  pushOptions(): void { this.toolService.setCurrentOptions(this.options); }
  constructor(private toolService : ToolService, private layerService : LayerService, private mapService : MapService) { }
  
  ngOnInit() {
    this.primaryLayerId = this.mapService.currentMap.primaryLayerId;
    this.pushOptions();
    this.layerService.currentLayers.subscribe(x => this.layers = x);
  }

  compareFn(c1: Number, c2: Number): boolean {return c1 == c2;}

  addClick() { this.options.activateAdd(); this.pushOptions(); }
  removeClick() { this.options.activateRemove(); this.pushOptions(); }
  editClick() { this.options.activateEdit(); this.pushOptions(); }
  settingsClick() { this.options.activateSettings(); this.pushOptions(); }
}
