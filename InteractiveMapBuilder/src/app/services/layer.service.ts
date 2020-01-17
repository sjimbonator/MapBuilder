import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Map } from '../models/map';
import  * as globals from '../globals';
import { Layer } from '../models/layer';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  constructor(private http: HttpClient, private mapService: MapService) { }

  currentLayer : Layer = new Layer();
  setCurrentLayer(layer : Layer) { this.currentLayer = layer; } 
  clearCurrentLayer() { this.currentLayer = new Layer(); }

  private getCurrentMapId() : number { return this.mapService.currentMap.id;}

  //Functions to interact with layers
  layerUrl: string = globals.url + "/api/Layers";
  //Gets all layers of the current map
  getLayers(): Observable<Layer[]> {return this.http.get<Layer[]>(this.layerUrl+"/"+this.getCurrentMapId(), globals.httpOptions);}
  //Deletes a Layer
  deleteLayer(id: number): Observable<Layer> 
  {
    if(this.currentLayer.id == id) {this.clearCurrentLayer();}
    return this.http.delete<Layer>(this.layerUrl+"/"+id, globals.httpOptions);
  }
  //Uploads a new Layer
  postLayer(name: string): Observable<Layer> 
  {
    let layer:Layer= new Layer();
    layer.name = name;
    layer.mapId = this.getCurrentMapId();
    console.log(this.getCurrentMapId());
    return this.http.post<Layer>(this.layerUrl, layer, globals.httpOptions);
  }

}
