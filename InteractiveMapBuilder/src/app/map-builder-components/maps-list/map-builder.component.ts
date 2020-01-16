import { Component, OnInit } from '@angular/core';
import {Map} from '../../models/map'
import { Observable } from 'rxjs';
import  * as globals from '../../globals';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-builder',
  templateUrl: './map-builder.component.html',
  styleUrls: ['./map-builder.component.css']
})
export class MapBuilderComponent implements OnInit {

  maps: Observable<Map[]>;
  mapName = '';
  buttonState = false;

  constructor(private mapService : MapService) { }

  getList(): void
  {
    this.maps = this.mapService.getMaps();
  }
  addMap(mapName : string): void
  {
    console.log(mapName);
    let map = new Map();
    map.name = mapName;
    this.mapService.postMap(map).subscribe(() => this.maps = this.mapService.getMaps());
    
  }
  removeMap(Id : string): void
  {
    if (confirm("Are you sure you want to delete this ?")) { this.mapService.deleteMap(Id).subscribe(() => this.maps = this.mapService.getMaps()) }
    
  }
  
  checkAuthenticated() {return globals.isAuthenticated;}

  ngOnInit() {
    this.getList();
  }

  mapClick(map:Map)
  {
    this.mapService.setCurrentMap(map);
  }
}
