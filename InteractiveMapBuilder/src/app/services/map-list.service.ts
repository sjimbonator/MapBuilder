import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Map } from '../models/map';
import  * as globals from '../globals';

@Injectable({
  providedIn: 'root'
})
export class MapListService {
  url: string = globals.url + "/api/Maps";
  
  constructor(private http: HttpClient) { }

  //Gets all maps
  getMaps(): Observable<Map[]> {return this.http.get<Map[]>(this.url, globals.httpOptions);}
  //Gets a specific map based on Id
  getMap(Id: string): Observable<Map> {return this.http.get<Map>(this.url+"/"+Id, globals.httpOptions);}
  //Replaces a Map with a new Map object
  putMap(map: Map): Observable<Map> {return this.http.put<Map>(this.url+"/"+map.id, map, globals.httpOptions)}
  //Uploads a new Map
  postMap(map: Map): Observable<Map> {return this.http.post<Map>(this.url, map, globals.httpOptions)}
  //Deletes a Map
  deleteMap(Id: string): Observable<Map> {return this.http.delete<Map>(this.url+"/"+Id, globals.httpOptions)}
}