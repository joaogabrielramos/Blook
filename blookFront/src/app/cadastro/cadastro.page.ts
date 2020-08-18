import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/* Toast */
import { ToastController } from '@ionic/angular';


/* Services */
import { AuthService } from "./../services/auth.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  registerForm: FormGroup;

  constructor(public formbuilder:FormBuilder,
              public router: Router,
              public authService: AuthService,
              public toastController:ToastController
             ) {
    this.registerForm = this.formbuilder.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required, Validators.email]],
      phone_number:[null,[Validators.required, Validators.maxLength(15)]],
      password:[null, [Validators.required, Validators.minLength(8)]],
      confirmPassword:[null, [Validators.required, Validators.minLength(8)]],
      date_of_birth:[null,[Validators.required, Validators.maxLength(10)]],
      genre: [null, [Validators.required]]
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cadastrado com sucesso. Seja bem vinda(o)!',
      duration: 2000,
      color:"dark"
    });
    toast.present();
  }

  submitRegister(form) {
    console.log(form);

    this.authService.register(form.value).subscribe (
      (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.success.token);
        this.router.navigate(['/feed']);
        window.location.reload();
      }, (err) => {
        console.log(err);
      }
    );

    console.log("entrei");
  }

  ngOnInit() {
  }

}
