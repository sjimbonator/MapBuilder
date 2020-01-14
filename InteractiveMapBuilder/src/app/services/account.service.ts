import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountModel } from '../models/account';
import  * as globals from '../globals';
import { UserManager, UserManagerSettings, User } from 'oidc-client';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: string = globals.url + "/api/Account";

  constructor(private http: HttpClient) { }

  register(user : AccountModel): Observable<AccountModel> {return this.http.post<AccountModel>(this.url + "/Register", user, httpOptions)}
}
