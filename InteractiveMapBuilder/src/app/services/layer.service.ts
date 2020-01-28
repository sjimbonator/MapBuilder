import { Injectable, OnInit } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Map } from '../models/map';
import  * as globals from '../globals';
import { Layer } from '../models/layer';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class LayerService{

  //Behaviour subject to automatically receive all the current layers
  public currentLayers : BehaviorSubject<Observable<Layer[]>>;

  //Behaviour subject to push the current layer to all the components that need it.
  private currentLayer : BehaviorSubject<Layer>;

  constructor(private http: HttpClient, private mapService: MapService) 
  {
     this.currentLayer = new BehaviorSubject<Layer>(new Layer());
     this.currentLayers = new BehaviorSubject<Observable<Layer[]>>(this.getLayers());
     this.mapService.currentMapSubject.subscribe(x => this.currentLayers.next(this.getLayers()))
     this.getCurrentLayer().subscribe( x => this.currLayer = x) 
  }

  public setCurrentLayer(layer : Layer) {this.clearCurrentLayer(); this.currentLayer.next(layer); } 
  public clearCurrentLayer() { this.currentLayer.next(new Layer());}
  public getCurrentLayer(): Observable<Layer> { return this.currentLayer.asObservable();}

  private currLayer: Layer;


  private getCurrentMapId() : number { return this.mapService.currentMap.id;}

  //Functions to interact with layers
  layerUrl: string = globals.url + "/api/Layers";
  //Gets all layers of the current map
  getLayers(): Observable<Layer[]> {return this.http.get<Layer[]>(this.layerUrl+"/"+this.getCurrentMapId(), globals.httpOptions);}
  //Deletes a Layer
  deleteLayer(id: number): Observable<Layer> 
  {
    if(this.currLayer.id == id) {this.clearCurrentLayer();}
    let del = this.http.delete<Layer>(this.layerUrl+"/"+id, globals.httpOptions);
    this.currentLayers.next(this.getLayers());
    return del;
  }
  //Uploads a new Layer
  postLayer(name: string): Observable<Layer> 
  {
    let layer:Layer= new Layer();
    layer.name = name;
    layer.mapId = this.getCurrentMapId();
    console.log(this.getCurrentMapId());
    let post = this.http.post<Layer>(this.layerUrl, layer, globals.httpOptions);
    this.currentLayers.next(this.getLayers());
    return post;
  }
  //Edits an existing Layer
  putLayer(layer : Layer): Observable<Layer>
  {
    let put = this.http.put<Layer>(this.layerUrl+"/"+this.currLayer.id, layer, globals.httpOptions);
    this.currentLayers.next(this.getLayers());
    return put;
  }

}
