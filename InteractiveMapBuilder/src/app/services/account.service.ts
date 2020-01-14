import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountModel } from '../models/account';
import  * as globals from '../globals';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: string = globals.url + "/api/Account";

  constructor(private http: HttpClient) { }

  register(user : AccountModel): Observable<AccountModel> {return this.http.post<AccountModel>(this.url + "/Register", user, globals.httpOptions)}
  getToken(user : AccountModel): Observable<AccountModel> {return this.http.post<AccountModel>(globals.url + "/token", `grant_type=${"password"}&username=${user.Email}&password=${user.Password}`, { headers: new HttpHeaders({ 'Content-Type': 'ax-www-form-urlencoded'}) })}
  private createBody(user:AccountModel) 
  {
    let body= new URLSearchParams();
    body.set("grant_type", "password")
    body.set("username", user.Email)
    body.set("Password", user.Password)
    return body;
  }
}
