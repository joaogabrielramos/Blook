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
  myDetails = { id: null,};

  userId = -2;
  profileUserId = -1;

  updateUserForm: FormGroup;
  editProfileMode: boolean = false;
  following:boolean;
  profileDetails = [];

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
    this.showUser();
  }

  toggleEdit(){ 
    this.editProfileMode = true;
  }

  /* Integrações */
  getDetails() {
    this.authService.getDetails().subscribe(
      (res) => {
        this.myDetails = res.success;
        this.userId = this.myDetails.id;
        console.log('user:', this.myDetails);
      }, (err) => {
        console.log(err);
      }
    );
  }

  showUser() {
    this.profileService.showUser(this.profileUserId).subscribe(
      (res) => {
        console.log(res);
        this.profileDetails = res.userDetails;
        this.following = res.following;
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
        this.updateUserForm.reset();
        this.showUser();
      }, (err) => {
        console.log(err);
      }
    );
  }

  followUser() {
    this.profileService.followUser(this.profileUserId).subscribe(
      (res) => {
        console.log(res);
        this.following = res.response;
      }, (err) => {
        console.log(err);
      }
    );
  }

  listUserPosts() {
    this.profileService.listUserPosts(this.userId).subscribe(
      (res) => {
        this.posts = res;
        console.log('USER POSTS', res);
      },
      (err) => {
        console.log('ERRO', err);
      }
    )
  }

  getFollowers() {
    this.profileService.getFollowers(this.userId).subscribe(
      (res) => {
        this.followers = res;
        console.log('followers', res );
      },
      (err) => {
        console.log('ERRO', err);
      }
    )
  }

  getFollowing() {
    this.profileService.getFollowing(this.userId).subscribe(
      (res) => {
        this.following = res;
        console.log('following', res );
      },
      (err) => {
        console.log('ERRO', err);
      }
    )
  }
}
