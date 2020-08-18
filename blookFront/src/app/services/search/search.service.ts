import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  
  providedIn: 'root'
})
export class SearchService {
  apiURL:string = 'http://localhost:8000/api/';

  httpHeaders: any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }


  constructor(public http:HttpClient) { }


  listUsers(): Observable<any>{
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.get(this.apiURL + 'listUsers', this.httpHeaders);
  }

  listPosts():Observable<any>{
    return this.http.get(this.apiURL + 'listPosts');
  }
}
