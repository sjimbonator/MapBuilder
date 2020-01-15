import { Component, OnInit } from '@angular/core';
import { MapListService } from '../services/map-list.service'
import {Map} from '../models/map'
import { Observable } from 'rxjs';
import  * as globals from '../globals';

@Component({
  selector: 'app-map-builder',
  templateUrl: './map-builder.component.html',
  styleUrls: ['./map-builder.component.css']
})
export class MapBuilderComponent implements OnInit {

  maps: Observable<Map[]>;
  mapName = '';
  buttonState = false;

  constructor(private listService: MapListService) { }

  getList(): void
  {
    this.maps = this.listService.getMaps();
  }
  addMap(mapName : string): void
  {
    console.log(mapName);
    let map = new Map();
    map.Name = mapName;
    this.listService.postMap(map).subscribe(() => this.maps = this.listService.getMaps());
    
  }
  removeMap(Id : string): void
  {
    if (confirm("Are you sure you want to delete this ?")) { this.listService.deleteMap(Id).subscribe(() => this.maps = this.listService.getMaps()) }
    
  }
  
  checkInput(){
    if (this.mapName === ''){
      this.buttonState = true;
      return this.buttonState;
    }
  }

  resetInput(){
    this.mapName = '';
  }

  checkAuthenticated() {return globals.isAuthenticated;}

  ngOnInit() {
    this.getList();
    
  }
}
