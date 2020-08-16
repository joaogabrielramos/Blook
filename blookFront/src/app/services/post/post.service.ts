import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiURL:string = 'http://localhost:8000/api/';

  httpHeaders: any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  constructor(public http: HttpClient) { }

  createPost(form): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.post(this.apiURL + 'createPost', form, this.httpHeaders);
  }

  updatePost(id, form): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.put(this.apiURL + 'updatePost/' + id, form, this.httpHeaders);
  }

  deletePost(id): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.delete(this.apiURL + 'deletePost/' + id, this.httpHeaders);
  }

  showPost(id): Observable<any> {
    return this.http.get(this.apiURL + 'showPost/' + id);
  }

  listPosts(): Observable<any> {
    return this.http.get(this.apiURL + 'listPosts');
  }
}
