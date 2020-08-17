import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL:string = 'http://localhost:8000/api/';

  httpHeaders: any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  constructor(public http: HttpClient) { 

  }

  register(form): Observable<any> {
    return this.http.post(this.apiURL + 'register', form, this.httpHeaders);
  }

  login(form): Observable<any> {
    return this.http.post(this.apiURL + 'login', form, this.httpHeaders);
  }

  logout(): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.get(this.apiURL + 'logout', this.httpHeaders);
  }

  isLoggedIn() {
    return localStorage.getItem("userToken")!==null;
  }
}
