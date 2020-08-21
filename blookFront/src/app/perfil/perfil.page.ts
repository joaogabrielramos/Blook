import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  photo: SafeResourceUrl;
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
              public sanitizer: DomSanitizer,
             ) {
    this.updateUserForm = this.formbuilder.group({
      name:[null, [Validators.required]],
      phone_number:[null, [Validators.required, Validators.maxLength(15)]],
      date_of_birth:[null, [Validators.required, Validators.maxLength(10)]],
      gender: [null, [Validators.required]],
      profile_pic: [null],
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

  untoggleEdit(){ 
    this.editProfileMode = false;
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

    if(this.photo) {
      form.value.profile_pic = this.photo['changingThisBreaksApplicationSecurity'];
    }
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

  /*   Função upload câmera capacitor */
  async takePicture() {
    const profile_pic = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(profile_pic && (profile_pic.dataUrl));
  }
}
