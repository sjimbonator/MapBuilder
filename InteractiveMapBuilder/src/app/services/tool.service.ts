import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToolOptions } from '../models/toolOptions';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

   //Behaviour subject to push the current toolOptions to all the components that need it.
   private currentOptions : BehaviorSubject<ToolOptions>;

   constructor() 
   {
      this.currentOptions = new BehaviorSubject<ToolOptions>(new ToolOptions());
   }
 
   public setCurrentOptions(options : ToolOptions) {this.currentOptions.next(options); } 
   public getCurrentOptions(): Observable<ToolOptions> { return this.currentOptions.asObservable();}
  
  }
