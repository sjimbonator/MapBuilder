import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import {Layer} from '../../models/layer'
import { Observable } from 'rxjs';
import { LayerService } from 'src/app/services/layer.service';

@Component({
  selector: 'app-layers-list',
  templateUrl: './layers-list.component.html',
  styleUrls: ['./layers-list.component.css']
})
export class LayersListComponent implements OnInit {

  layers: Observable<Layer[]>;
  layerName = '';

  constructor(private layerService : LayerService) { }

  getLayers() : void {this.layers = this.layerService.getLayers();}

  layerClick(layer:Layer) {this.layerService.setCurrentLayer(layer);}

  removeLayer(layerId:number) {this.layerService.deleteLayer(layerId).subscribe(() => this.layers = this.layerService.getLayers());}
  
  addLayer(name:string){
    this.layerService.postLayer(name).subscribe(() => this.layers = this.layerService.getLayers());
  }

  ngOnInit() { this.getLayers(); }

}
