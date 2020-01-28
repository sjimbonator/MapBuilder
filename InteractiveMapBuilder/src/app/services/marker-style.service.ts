import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  * as globals from '../globals';
import { MarkerStyle } from '../models/markerStyle';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerStyleService {

  private hiddenStyles: MarkerStyle[] = [];
  
  checkHidden(style : MarkerStyle) : boolean
  { 
    
    for(let checkStyle of this.hiddenStyles)
    {
      if(style.id==checkStyle.id){return true;}
    }
    return false;
  }
  hide(style : MarkerStyle)
  {
    if(!this.checkHidden(style)) {this.hiddenStyles.push(style)};
  }
  show(style : MarkerStyle)
  {
    if(this.checkHidden(style))
    {
      const index = this.hiddenStyles.indexOf(style, 0);
      if (index > -1) {this.hiddenStyles.splice(index, 1);}
    }
  }
  
  constructor(private http: HttpClient, private mapService: MapService) {}

    markerStyleUrl: string = globals.url + "/api/MarkerStyles";

    //Gets all markers from a specific layer
    getMarkerStyles(): Observable<MarkerStyle[]> {return this.http.get<MarkerStyle[]>(this.markerStyleUrl+"/"+this.mapService.currentMap.id, globals.httpOptions);}

    //Uploads a new Marker
    postMarkerStyle(markerStyle: MarkerStyle): Observable<MarkerStyle> 
    {
      markerStyle.mapId=this.mapService.currentMap.id;
      return this.http.post<MarkerStyle>(this.markerStyleUrl, markerStyle, globals.httpOptions); 
    }
}
