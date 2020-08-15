import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

/* Services */
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    
    {
      title: 'Meu Perfil',
      url: '/folder/Outbox',
      icon: 'person'
    },
    {
      title: 'Estante Virtual',
      url: '/folder/Inbox',
      icon: 'library'
    },
    {
      title: 'Bookplace',
      url: '/folder/Favorites',
      icon: 'pricetags'
    },
    {
      title: 'Desafios',
      url: '/folder/Archived',
      icon: 'star'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public authService: AuthService
  ) {
    this.initializeApp();
  }

/*   Funções da integração */
  logout() {
    this.authService.logout().subscribe (
      (res) => {
        console.log(res);
        localStorage.removeItem('userToken');
        if (this.router.url === '/feed') {
          window.location.reload();
        } else{
          this.router.navigate(['/feed']);
        }
        console.log('Já saí!');
      }, (err) => {
        console.log(err);
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
