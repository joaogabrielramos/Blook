import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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

  //Criando o form
  registerForm: FormGroup;

  
  constructor(public formbuilder:FormBuilder,
              public router: Router,
              public authService: AuthService,
              public toastController:ToastController
             ) {
   
    this.registerForm = this.formbuilder.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      phone_number:[null,[Validators.required,Validators.maxLength(15)]],
      password:[null,[Validators.required,Validators.minLength(8)]],
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])),
      date_of_birth:[null,[Validators.required, Validators.maxLength(10)]],
      gender: [null, [Validators.required]],
      image:[],
    }, { 
      validators: this.password.bind(this)
     });
  }

  backToHome() {
    this.router.navigate(['/feed']);
  }

  //Toast quando apertar o botão de cadastrar
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cadastrado com sucesso. Seja bem vinda(o)!',
      duration: 2000,
      color:"dark"
    });
    toast.present();
  }

  //Enviado o form pro console
  submitRegister(form) {
    console.log(form);
    //Cadastrando
    this.authService.register(form.value).subscribe (
      (res) => {
        console.log(res);
        console.log("entrei");
        localStorage.setItem('userToken', res.success.token);
        this.router.navigate(['/feed']).then(()=>window.location.reload());
      }, (err) => {
        console.log(err);
      }
    );

    
  }

  ngOnInit() {
  }

// Conferere se as senhas coincidem
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
