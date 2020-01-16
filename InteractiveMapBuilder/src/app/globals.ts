import { HttpClient, HttpHeaders } from '@angular/common/http';
export let url: string = "https://localhost:44386"
export let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
export function setToken(token:string) { httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token}) };  isAuthenticated = true;}
export function removeToken() { httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  isAuthenticated = false;}
export let isAuthenticated : boolean = false;

//import { Map } from './models/map';
//export let currentMap: Map;
//export function setCurrentMap(map : Map) {currentMap = map;}
//export function clearCurrentMap() { currentMap = undefined;}
