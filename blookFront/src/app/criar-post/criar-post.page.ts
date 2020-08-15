import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
class avatar{
  image:string
}
@Component({
  selector: 'app-criar-post',
  templateUrl: './criar-post.page.html',
  styleUrls: ['./criar-post.page.scss'],
})
export class CriarPostPage implements OnInit {
  avatar:any

  submitForm(form){
    console.log(form);
    console.log(form.value);
  }






  photo: SafeResourceUrl;
  postForm:FormGroup

  constructor(private sanitizer: DomSanitizer, public formbuilder:FormBuilder) { 
    this.postForm = this.formbuilder.group({
      option:[null,[Validators.required]],
      text:[null,[Validators.required]],
      title:[null],
      picture:[null],

      
      
    })

    this.avatar = {
      img:"../../assets/image/Ellipse.svg"
    }
  }

  ngOnInit() {}

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
