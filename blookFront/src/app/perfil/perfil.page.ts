import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/*Services*/
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userDetails = [];

  constructor(
    public authService: AuthService,
    public router: Router,) { }

  ngOnInit() {
    this.getDetails();
  }


  /* Integrações */
  getDetails() {
    this.authService.getDetails().subscribe(
      (res) => {
        this.userDetails = res.success;
        console.log(this.userDetails);
      }, (err) => {
        console.log(err);
      }
    )
  }

}
