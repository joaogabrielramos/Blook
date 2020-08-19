import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

/*Services*/
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.component.html',
  styleUrls: ['./tabmenu.component.scss'],
})
export class TabmenuComponent implements OnInit {
  
  userDetails = [];

  userId;

  auth = localStorage.getItem("userToken")!==null;

  constructor(
    public router: Router,
    public authService: AuthService) { }


  /* Rotas */
  navigateToSearch() {
    this.router.navigate(['/pesquisar']);
  }

  navigateToHome() {
    this.router.navigate(['/feed']);
  }

  navigateToMyProfile() {
    this.router.navigate(['/perfil', {'profileUserId': this.userId}]);
    
  }

  /* Integrações */
  getDetails() {
    this.authService.getDetails().subscribe(
      (res) => {
        this.userDetails = res.success;
        this.userId = res.userDetails.id;
        console.log('user:', this.userDetails);
      }, (err) => {
        console.log(err);
      }
    );
  }

  ionViewWillEnter() {
    this.getDetails();
  }

  ngOnInit() {
    this.getDetails();
  }

}
