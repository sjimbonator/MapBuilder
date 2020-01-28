import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/app/services/tool.service';
import { ToolOptions } from 'src/app/models/toolOptions';
import { Marker } from 'src/app/models/marker';
import { Layer } from 'src/app/models/layer';
import { Observable } from 'rxjs';
import { LayerService } from 'src/app/services/layer.service';
import { MapService } from 'src/app/services/map.service';
import { MarkerStyleService } from 'src/app/services/marker-style.service';
import { MarkerStyle } from 'src/app/models/markerStyle';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private toolService : ToolService, private layerService : LayerService, private mapService : MapService, private markerStyleService : MarkerStyleService) { }
  
  ngOnInit() {
    this.primaryLayerId = this.mapService.currentMap.primaryLayerId;
    this.pushOptions();
    this.layerService.currentLayers.subscribe(x => this.layers = x);
    this.styles = this.markerStyleService.getMarkerStyles();
  }

  options : ToolOptions = new ToolOptions;
  pushOptions(): void { this.toolService.setCurrentOptions(this.options); }

  addClick() { this.options.activateAdd(); this.pushOptions(); }
  removeClick() { this.options.activateRemove(); this.pushOptions(); }
  editClick() { this.options.activateEdit(); this.pushOptions(); }
  settingsClick() { this.options.activateSettings(); this.pushOptions(); }

  layers: Observable<Layer[]>;
  primaryLayerId : number;
  updatePrimaryLayer(): void 
  {
    let putMap = this.mapService.currentMap;
    putMap.primaryLayerId = this.primaryLayerId;
    this.mapService.putMap(putMap).subscribe();
  }
  compareFn(c1: Number, c2: Number): boolean {return c1 == c2;}

  styles: Observable<MarkerStyle[]>;

  newStyleName: string;
  newStyleImageUrl: string;
  newStyleClick() 
  {
    let newStyle: MarkerStyle = new MarkerStyle();
    newStyle.name = this.newStyleName;
    newStyle.imageUrl = this.newStyleImageUrl;
    newStyle.width = 40;
    newStyle.height = 40;
    this.markerStyleService.postMarkerStyle(newStyle).subscribe( ()=>  this.styles = this.markerStyleService.getMarkerStyles() );
    this.newStyleName= "";
    this.newStyleImageUrl= "";
  }

}
