import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Map } from '../models/map';
import  * as globals from '../globals';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  currentMapSubject : ReplaySubject<Map>;
  constructor(private http: HttpClient) 
  {
    this.currentMapSubject = new ReplaySubject<Map>();
  }

  //Functions to store a map in memory
  currentMap: Map;
  setCurrentMap(map : Map) {this.currentMap = map; this.currentMapSubject.next(map);}
  clearCurrentMap() { this.currentMap = undefined;}

  //Functions to interact with maps
  private mapUrl: string = globals.url + "/api/Maps";
  //Gets all maps
  getMaps(): Observable<Map[]> {return this.http.get<Map[]>(this.mapUrl, globals.httpOptions);}
  //Gets a specific map based on Id
  getMap(id: number): Observable<Map> {return this.http.get<Map>(this.mapUrl+"/"+id, globals.httpOptions);}
  //Replaces a Map with a new Map object
  putMap(map: Map): Observable<Map> {return this.http.put<Map>(this.mapUrl+"/"+map.id, map, globals.httpOptions)}
  //Uploads a new Map
  postMap(map: Map): Observable<Map> {return this.http.post<Map>(this.mapUrl, map, globals.httpOptions)}
  //Deletes a Map
  deleteMap(id: number): Observable<Map> {return this.http.delete<Map>(this.mapUrl+"/"+id, globals.httpOptions)}
}
