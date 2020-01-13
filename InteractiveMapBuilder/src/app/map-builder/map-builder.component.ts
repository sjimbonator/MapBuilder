import { Component, OnInit } from '@angular/core';
import { MapListService } from '../map-list.service'

@Component({
  selector: 'app-map-builder',
  templateUrl: './map-builder.component.html',
  styleUrls: ['./map-builder.component.css']
})
export class MapBuilderComponent implements OnInit {

  constructor(private listService: MapListService) { }

  private mapList: string[];
  getList(): void
  {
    this.listService.getMapList().subscribe(mapList => this.mapList = mapList)
  }
  ngOnInit() {
    this.getList();
  }

}
