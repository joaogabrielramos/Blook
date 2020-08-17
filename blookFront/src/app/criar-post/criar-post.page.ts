import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    public router: Router ) { 
    this.postForm = this.formbuilder.group(
      {
      post_type:[null,[Validators.required]],
      text:[null,[Validators.required]],
      title:[null],
      image:[null],
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
        this.router.navigate(['/feed']);
      }, (err) => {
        console.log(err);
      }
    )
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
