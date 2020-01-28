import { Injectable, OnInit } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Marker } from '../models/marker';
import  * as globals from '../globals';
import { LayerService } from './layer.service';
import { Layer } from '../models/layer';
import { MarkerStyle } from '../models/markerStyle';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient, private layerService: LayerService) 
  { 
    this.layerService.getCurrentLayer().subscribe( x => this.currLayer = x ) 
  }

    markerUrl: string = globals.url + "/api/Markers";

    private currLayer: Layer;


    //Gets all markers from a specific layer
    getMarkers(): Observable<Marker[]> {return this.http.get<Marker[]>(this.markerUrl+"/"+this.currLayer.id, globals.httpOptions);}
    //Replaces a Marker with a new Marker object
    putMarker(marker: Marker): Observable<Marker> { marker.layerId=this.currLayer.id;return  this.http.put<Marker>(this.markerUrl+"/"+marker.id, marker, globals.httpOptions); }
    //Uploads a new Marker
    postMarker(marker: Marker): Observable<Marker> { marker.layerId=this.currLayer.id; return this.http.post<Marker>(this.markerUrl, marker, globals.httpOptions); }
    //Deletes a Marker
    deleteMarker(id: number): Observable<Marker> {return this.http.delete<Marker>(this.markerUrl+"/"+id, globals.httpOptions)}
}
