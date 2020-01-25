import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-map-builder-shell',
  templateUrl: './map-builder-shell.component.html',
  styleUrls: ['./map-builder-shell.component.css']
})
export class MapBuilderShellComponent implements OnInit {
  
  constructor(private breakpointObserver: BreakpointObserver) { }

  rowHeight : string;
  mapColSpan : number;
  toolColSpan : number;

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 699px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.mapColSpan = 4;
          this.toolColSpan = 1;
          this.rowHeight = " 2 : 5";
        } else {
          this.mapColSpan = 6;
          this.toolColSpan = 3;
          this.rowHeight = " 2 : 8";
        }
      });
  }

}
