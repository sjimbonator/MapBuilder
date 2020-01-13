import { Component, OnInit } from '@angular/core';
import { MapListService } from '../map-list.service'

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css']
})
export class MapViewerComponent implements OnInit {

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
