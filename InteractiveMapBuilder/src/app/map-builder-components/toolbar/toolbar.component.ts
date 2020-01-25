import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/app/services/tool.service';
import { ToolOptions } from 'src/app/models/toolOptions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  options : ToolOptions = new ToolOptions;
  pushOptions(): void { this.toolService.setCurrentOptions(this.options); }
  constructor(private toolService : ToolService) { }
  
  ngOnInit() {
    this.pushOptions();
  }

  addClick = function() { this.options.activateAdd(); this.pushOptions(); }
  removeClick() { this.options.activateRemove(); this.pushOptions(); }
  editClick() { this.options.activateEdit(); this.pushOptions(); }
  selectClick() { this.options.activateSelect(); this.pushOptions(); }
}
