import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkerStyle } from '../models/markerStyle';
import { MarkerStyleService } from '../services/marker-style.service';

@Component({
  selector: 'app-map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.css']
})
export class MapLegendComponent implements OnInit {

  styles: Observable<MarkerStyle[]>;

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
  constructor(private markerStyleService : MarkerStyleService) { }

  ngOnInit() {
    this.styles = this.markerStyleService.getMarkerStyles();
  }

}
