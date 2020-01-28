import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map-viewer-shell',
  templateUrl: './map-viewer-shell.component.html',
  styleUrls: ['./map-viewer-shell.component.css']
})
export class MapViewerShellComponent implements OnInit {

  id: number;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private mapService : MapService) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.queryParamMap.get("mapId"));
    this.mapService.getMap(this.id).subscribe( x=>{this.mapService.setCurrentMap(x); console.log(x);}, err => {console.log(err)}, () => {this.loading = false; console.log( "()")} )
  }

}
