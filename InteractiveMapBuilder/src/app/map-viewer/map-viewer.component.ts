import { Component, OnInit } from '@angular/core';
import  * as globals from '../globals';
import { MapService } from '../services/map.service';
import { Observable } from 'rxjs';
import {Map} from '../models/map'

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css']
})
export class MapViewerComponent implements OnInit {

  maps: Observable<Map[]>;
  currentMapId : number;

  constructor(private mapService : MapService) { }

  getList(): void
  {
    this.maps = this.mapService.getMaps();
  }
  ngOnInit() {this.getList()}
  checkAuthenticated() {return globals.isAuthenticated;}

}
