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

  showPost(id, user_id): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.get(this.apiURL + 'showPost/' + id + '/' + user_id, this.httpHeaders);
  }

  likePost(id): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.get(this.apiURL + 'likePost/' + id, this.httpHeaders);
  }

  createComment(form): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.post(this.apiURL + 'createComment/', form, this.httpHeaders);
  }
  
  listPostCards(): Observable<any> {
    return this.http.get(this.apiURL + 'listPostCards');
  }

  listFollowingPosts(): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.get(this.apiURL + 'listFollowingPosts', this.httpHeaders);
  }
}
