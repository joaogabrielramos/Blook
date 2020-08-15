import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

/* Services */
import { AuthService } from "./../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


loginForm:FormGroup;

  constructor(public formBuilder : FormBuilder,
              public router: Router,
              public authService: AuthService 
             ) { 
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.email,Validators.required]],
      password:[null,[Validators.required,Validators.minLength(8)]]
    });
  }

  submitLogin(form){
    console.log(form);

    this.authService.login(form.value).subscribe (
      (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.success.token);
        this.router.navigate(['/feed']);
      }, (err) => {
        console.log(err);
      }
    );

    console.log("entrei");
  }
  
  ngOnInit() {
  }

}
