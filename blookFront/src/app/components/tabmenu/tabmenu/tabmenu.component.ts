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
  
  userDetails = { id: null,};

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
        console.log(res);
        this.userDetails = res.success;
        console.log('user:', this.userDetails);
        this.userId = this.userDetails.id;
        
      }, (err) => {
        console.log( err);
      }
    );
  }

  ngOnInit() {
    this.getDetails();
  }

}
