import { Component, OnInit } from '@angular/core';
import  * as globals from '../globals';
import { MapService } from '../services/map.service';
import { Observable } from 'rxjs';
import {Map} from '../models/map'
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css']
})
export class MapViewerComponent implements OnInit {

  maps: Observable<Map[]>;
  currentMapId : number;

  constructor(private mapService : MapService, private router: Router) { }

  sendClick(mapCode : string)
  {
    let mapId = mapCode.replace("2a3fy", "");
    this.router.navigate(['/map-viewer-shell'], {queryParams: {mapId: mapId}});
  }
  getList(): void
  {
    this.maps = this.mapService.getMaps();
  }
  ngOnInit() {this.getList()}
  checkAuthenticated() {return globals.isAuthenticated;}

}
