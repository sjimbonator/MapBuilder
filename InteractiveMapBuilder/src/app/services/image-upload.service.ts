import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  * as globals from '../globals';
import { FileDesc } from '../models/fileDesc';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  imgUrl: string = globals.url + "/api/ImageUploads";
  postImage(file : File) : Observable<FileDesc>
  { 
    const formData = new FormData();
    formData.append('file', file);
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'}) };
    return this.http.post<FileDesc>(this.imgUrl, formData)
  }

}
