import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  registerForm: FormGroup;

  submitForm(form) {
    console.log(form);
    console.log(form.value);
  }

  constructor(public formbuilder:FormBuilder) {
    this.registerForm = this.formbuilder.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required, Validators.email]],
      phone:[null,[Validators.required, Validators.maxLength(15)]],
      password:[null, [Validators.required, Validators.minLength(8)]],
      confirmPassword:[null, [Validators.required, Validators.minLength(8)]],
      birth:[null,[Validators.required, Validators.maxLength(10)]],
      gender: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

}
