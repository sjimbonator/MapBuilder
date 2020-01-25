export class ToolOptions{
    private add: boolean = false;
    private remove: boolean = false;
    private edit: boolean = false;
    private select: boolean = false;

    public getAdd(): boolean {return this.add;}
    public getRemove(): boolean {return this.remove;}
    public getEdit(): boolean {return this.edit;}
    public getSelect(): boolean {return this.select;}

    private setAllToFalse() { this.add = false; this.remove = false; this.edit = false; this.select = false;}

    public activateAdd(): void { this.setAllToFalse(); this.add = true;}
    public activateRemove(): void { this.setAllToFalse(); this.remove = true;}
    public activateEdit(): void { this.setAllToFalse(); this.edit = true;}
    public activateSelect(): void { this.setAllToFalse(); this.select = true;}
  }
  