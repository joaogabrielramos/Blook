import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.component.html',
  styleUrls: ['./tabmenu.component.scss'],
})
export class TabmenuComponent implements OnInit {

  auth = localStorage.getItem("userToken")!==null;

  constructor(public router: Router) { }

  navigateToSearch() {
    this.router.navigate(['/pesquisar']);
  }

  navigateToHome() {
    this.router.navigate(['/feed']);
  }

  navigateToProfile() {
    this.router.navigate(['/perfil']);
  }

  ngOnInit() {}

}
