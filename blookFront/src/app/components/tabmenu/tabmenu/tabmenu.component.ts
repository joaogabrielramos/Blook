import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.component.html',
  styleUrls: ['./tabmenu.component.scss'],
})
export class TabmenuComponent implements OnInit {

  auth:boolean = localStorage.getItem("userToken")!==null;

  constructor() { }

  ngOnInit() {}

}
