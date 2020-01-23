import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Marker } from '../models/marker';
import  * as globals from '../globals';
import { LayerService } from './layer.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient, private layerService: LayerService) { }

    markerUrl: string = globals.url + "/api/Markers";

    //Gets all markers from a specific layer
    getMarkers(): Observable<Marker[]> {return this.http.get<Marker[]>(this.markerUrl+"/"+this.layerService.currentLayer.id, globals.httpOptions);}
    //Replaces a Marker with a new Marker object
    putMarker(marker: Marker): Observable<Marker> {marker.layerId=this.layerService.currentLayer.id; return this.http.put<Marker>(this.markerUrl+"/"+marker.id, marker, globals.httpOptions)}
    //Uploads a new Marker
    postMarker(marker: Marker): Observable<Marker> {marker.layerId=this.layerService.currentLayer.id; return this.http.post<Marker>(this.markerUrl, marker, globals.httpOptions)}
    //Deletes a Marker
    deleteMarker(id: number): Observable<Marker> {return this.http.delete<Marker>(this.markerUrl+"/"+id, globals.httpOptions)}
}
