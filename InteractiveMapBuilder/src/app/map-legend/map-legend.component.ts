import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkerStyle } from '../models/markerStyle';
import { MarkerStyleService } from '../services/marker-style.service';
import { MapService } from '../services/map.service';
import { LayerService } from '../services/layer.service';

@Component({
  selector: 'app-map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.css']
})
export class MapLegendComponent implements OnInit {

  mapName : string;
  layerName : string;
  styles: Observable<MarkerStyle[]>;

  savedStyles: MarkerStyle[] = [];
  allAreHidden(): boolean
  {
    for(let style of this.savedStyles)
    {
      if (!this.styleIsHidden(style))return false;
    }
    return true;
  }

  hideAll()
  {
    for(let style of this.savedStyles)
    {
      if (!this.styleIsHidden(style))this.markerStyleService.hide(style);
    }
  }

  showAll()
  {
    for(let style of this.savedStyles)
    {
      if (this.styleIsHidden(style))this.markerStyleService.show(style);
    }
  }

  styleIsHidden(style : MarkerStyle) : boolean
  {
    return this.markerStyleService.checkHidden(style);
  }
  styleClick(style : MarkerStyle)
  {
    if(this.styleIsHidden(style))
    {
      this.markerStyleService.show(style);
    }
    else { this.markerStyleService.hide(style); }
  }
  constructor(private markerStyleService : MarkerStyleService, private mapService : MapService, private layerService : LayerService) { }

  ngOnInit() {
    this.mapName = this.mapService.currentMap.name;
    this.layerService.getCurrentLayer().subscribe( x => this.layerName = x.name);
    this.styles = this.markerStyleService.getMarkerStyles();
    this.styles.subscribe(x => this.savedStyles = x);
  }

}
