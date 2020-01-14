import { HttpClient, HttpHeaders } from '@angular/common/http';
export let url: string = "https://localhost:44386"
export let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : ''}) }; 
export function setToken(token:string) {httpOptions.headers.set('Authorization', token); console.log(httpOptions.headers.get('Authorization'));}
