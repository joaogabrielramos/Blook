import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  isLoggedIn() {
    return localStorage.getItem("userToken")!==null;
  }

  auth = this.isLoggedIn();
}
