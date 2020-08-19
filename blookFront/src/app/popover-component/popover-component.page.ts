import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import  { PopoverController } from '@ionic/angular';

import { TabmenuComponent } from '../components/tabmenu/tabmenu/tabmenu.component';
import { HeaderComponent } from '../components/header/header.component';

/* Services */
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.page.html',
  styleUrls: ['./popover-component.page.scss'],
})
export class PopoverComponentPage implements OnInit {

  logado: boolean;

  constructor(
    public popover: PopoverController,
    public router: Router,
    public authService: AuthService) { }

  ngOnInit() {
  }

  /* Função popover */
  closePopover() {
    this.popover.dismiss();
  }

  /*   Funções da integração */
  logout() {
    this.authService.logout().subscribe (
      (res) => {
        console.log(res);
        localStorage.removeItem('userToken');
        this.closePopover();
        this.logado = this.authService.isLoggedIn();
        console.log(this.logado);
        this.router.navigate(['/feed']).then(()=>window.location.reload());
        /* if (this.router.url === '/feed') {
          window.location.reload();
        } else{
          this.router.navigate(['/feed']);
        } */
        console.log('Já saí!');
      }, (err) => {
        console.log(err);
      }
    );
  }
}
