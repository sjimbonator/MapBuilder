import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../services/map.service';
import { LayerService } from '../services/layer.service';
import { MarkerService } from '../services/marker.service';
import { Map } from '../models/map';
import { Layer } from '../models/layer';
import { Marker } from '../models/marker';
import { ReplaySubject } from 'rxjs';
import { extent, proj, Feature, geom, MapBrowserEvent  } from 'openlayers';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  @Input() mapId:number;

  map : Map;
  layers : Layer[];
  markers : Marker[];

  currentLayer : Layer;

  loadingLayer : boolean;
  error : boolean = false;

  //variables for angular openlayers
  zoom: number;
  center: number[];
  extent: ol.Extent;
  po: olx.ProjectionOptions;
  projection : proj.Projection;

  constructor(private mapService : MapService, private layerService : LayerService, private markerService : MarkerService) { }

  ngOnInit() {
    this.loadingLayer = true;

    this.mapService.getMap(this.mapId).subscribe(
      x=>this.mapService.setCurrentMap(x),
      err => this.error = true,
      () => {
        this.layerService.getLayers().subscribe(
          x => this.layers = x,
          err => this.error = true,
          () => {this.mapService.getMap(this.mapId).subscribe(x => this.map = x, err => this.error=true, () => this.loadLayer(this.map.primaryLayerId));}
        )
      }
    )
    
  }

  //functions for loading in a layer ->
  loadLayer(layerId : number) : void
  {
    this.currentLayer = new Layer();
    this.loadingLayer = true;

    let errorBool = true;
    for(let layer of this.layers)
    {
      if(layer.id == layerId)
      {
        this.currentLayer = layer;
        this.layerService.setCurrentLayer(layer);
        errorBool = false;
        break;
      }
    }
    if(errorBool){this.error = errorBool;return;}
    
    this.setOpenLayersVars(this.currentLayer.imageUrl);
  }

  setOpenLayersVars(imageUrl : string) : void
  {
    //find a way to catch errors here
    let loaded : ReplaySubject<number[]> = new ReplaySubject<number[]>();
    loaded.subscribe(x => this.afterLoad(x[0],x[1]) );
    
    let img:HTMLImageElement = new Image();
    img.onload = function(){loaded.next([img.width,img.height]);}
    img.src=imageUrl;
  }

  afterLoad(width:number, height:number)
  {
    this.zoom = 2.2;
    this.center = [width/2,height/2];
    this.extent= [0, 0, width, height];
    this.po = {
      code: 'xkcd-image',
      units: 'pixels',
      extent: [0, 0, width, height]
    }
    this.projection= new proj.Projection(this.po);
    this.loadMarkers();
  }
  loadMarkers() : void
  {
    this.markerService.getMarkers().subscribe( x => this.markers = x, err => this.error = true, () => this.loadingLayer = false);
  }
  // <- functions for loading in a layer

  // functions for interacting with markers ->
  onClick(feat: MapBrowserEvent) {
    //store click coords in variable
    let coords : number[] = feat.coordinate;

    let marker =this.findMarker(coords);
    if(marker != undefined)  
    { 
        if(marker.layerLinkId != undefined){ this.loadLayer(marker.layerLinkId);}
    }
    
  }

  findMarker(coords : number[]) : Marker
  {
    if(this.markers == undefined) return undefined;
    
    for(let marker of this.markers)
    {
      let xMin : number = coords[0] -10;
      let xMax : number = coords[0] +10;

      let yMin : number = coords[1] -10;
      let yMax : number = coords[1] +10;

      if( (marker.x >= xMin && marker.x <= xMax) && (marker.y >= yMin && marker.y <= yMax) ) { return marker}
    }
    return undefined;
  }
  // <- functions for interacting with markers

}
