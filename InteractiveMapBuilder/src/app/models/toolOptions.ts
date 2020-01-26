import { Marker } from './marker';

export class ToolOptions{
    marker: Marker = new Marker();
    
    private add: boolean = false;
    private remove: boolean = false;
    private edit: boolean = false;
    private settings: boolean = false;

    public getAdd(): boolean {return this.add;}
    public getRemove(): boolean {return this.remove;}
    public getEdit(): boolean {return this.edit;}
    public getSettings(): boolean {return this.settings;}

    private setAllToFalse() { this.add = false; this.remove = false; this.edit = false; this.settings = false;}

    public activateAdd(): void { this.setAllToFalse(); this.add = true;}
    public activateRemove(): void { this.setAllToFalse(); this.remove = true;}
    public activateEdit(): void { this.setAllToFalse(); this.edit = true;}
    public activateSettings(): void { this.setAllToFalse(); this.settings = true;}
  }
  