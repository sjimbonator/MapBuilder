import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-map-viewer-shell',
  templateUrl: './map-viewer-shell.component.html',
  styleUrls: ['./map-viewer-shell.component.css']
})
export class MapViewerShellComponent implements OnInit {

  id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.queryParamMap.get("mapId"));
  }

}
