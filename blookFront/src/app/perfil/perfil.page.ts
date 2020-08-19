import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/*Services*/
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile/profile.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userDetails = [];

  userId = -2;
  profileUserId = -1;

  updateUserForm: FormGroup;
  editProfileMode: boolean = false;

  constructor(public formbuilder:FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public authService: AuthService,
              public profileService: ProfileService, 
             ) {
    this.updateUserForm = this.formbuilder.group({
      name:[[Validators.required]],
      phone_number:[null, [Validators.required, Validators.maxLength(15)]],
      date_of_birth:[null, [Validators.required, Validators.maxLength(10)]],
      genre: [Validators.required],
    });

    this.route.params.subscribe(
      (params) => {
        this.profileUserId = params.profileUserId;
        console.log(this.profileUserId);
      });
  }

  ngOnInit() {
    this.getDetails();
  }

  toggleEdit(){ 
    this.editProfileMode = true;
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

  updateProfile(form) {
    console.log(form.value);

    this.profileService.updateProfile(form.value).subscribe(
      (res) => {
        console.log(res);
        this.editProfileMode = false;
        this.getDetails();
      }, (err) => {
        console.log(err);
      }
    );
  }

  followUser(id) {
    this.profileService.followUser(this.profileUserId).subscribe(
      (res) => {
        console.log("Usuário Seguido!", res);
      }, (err) => {
        console.log(err);
      }
    );
  }
}
