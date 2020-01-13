import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapListService {
  private listItems: string[] = ['Map van Kevin', 'Map van Sjimmie', 'Geofrrey zijn map'];

  constructor() { }

  getMapList(): Observable<string[]>
  {
    return of(this.listItems);
  }
  addMap(map : string): void
  {
    this.listItems.push(map);
  }
  removeMap(map : string)
  {
    for(let i : any = 0; i < this.listItems.length; i++)
    {
      if(this.listItems[i] == map){this.listItems.splice(i);}
    }
  }
}
