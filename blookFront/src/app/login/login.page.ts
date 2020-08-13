import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

submitForm(form){
  console.log(form);
  console.log(form.value);
}

loginForm:FormGroup;
  constructor(public formBuilder : FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.email,Validators.required]],
      password:[null,[Validators.required,Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

}
