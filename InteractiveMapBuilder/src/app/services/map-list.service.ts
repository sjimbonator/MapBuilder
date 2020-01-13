import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Map } from '../models/map';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 

@Injectable({
  providedIn: 'root'
})
export class MapListService {
  url: string = "https://localhost:44383/api/Maps"
  
  constructor(private http: HttpClient) { }

  //Gets all maps
  getMaps(): Observable<Map[]> {return this.http.get<Map[]>(this.url);}
  //Gets a specific map based on Id
  getMap(Id: string): Observable<Map> {return this.http.get<Map>(this.url+"/"+Id);}
  //Replaces a Map with a new Map object
  putMap(map: Map): Observable<Map> {return this.http.put<Map>(this.url+"/"+map.Id, map, httpOptions)}
  //Uploads a new Map
  postMap(map: Map): Observable<Map> {return this.http.post<Map>(this.url, map, httpOptions)}
  //Uploads a new Map
  deleteMap(Id: string): Observable<Map> {return this.http.delete<Map>(this.url+"/"+Id, httpOptions)}
}