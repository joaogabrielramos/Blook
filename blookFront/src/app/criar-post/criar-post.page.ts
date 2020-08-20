import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/*Toast*/
import { ToastController } from '@ionic/angular';

/* Services */
import { PostService } from "./../services/post/post.service";

class avatar{
  image:string;
}
@Component({
  selector: 'app-criar-post',
  templateUrl: './criar-post.page.html',
  styleUrls: ['./criar-post.page.scss'],
})
export class CriarPostPage implements OnInit {
  avatar:any;

  photo: SafeResourceUrl;
  postForm:FormGroup;

  constructor(
    private sanitizer: DomSanitizer,
    public formbuilder:FormBuilder,
    public postService: PostService,
    public toastController :ToastController,
    public router: Router ) { 
    this.postForm = this.formbuilder.group(
      {
      post_type:["postLivre",[Validators.required]],
      text:[null,[Validators.required]],
      title:[null],
      image:[],
    })

    this.avatar = {
      img:"../../assets/image/Ellipse.svg"
    }
  }

  ngOnInit() {}

  
  /* Integração Post */
  createPost(form) {
      console.log(form);
      console.log(form.value);
      let body = form.value;

    this.postService.createPost(body).subscribe(
      (res) => {
        console.log(res);
        this.presentToast();
        this.router.navigate(['/feed']);
      }, (err) => {
        console.log(err);
      }
    )
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Seu post foi publicado com sucesso!',
      duration: 2000,
      color:"dark"
    });
    toast.present();
  }

  /*   Função upload câmera capacitor */
  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

}
