import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

/* Services */
import { PostService } from "./../services/post/post.service";
import { AuthService } from '../services/auth.service';

import { PopoverController } from '@ionic/angular';

import { PostPopoverComponent } from '../components/post-popover/post-popover.component';

class Comment {
  photo: string;
  user: string;
  text: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  
  /* Variáveis */
  post = [];
  user = [];
  comments: Comment[];
  postId: any;
  userId = -2;
  postUserId = -1;

  editMode:boolean = false;

  commentForm: FormGroup;
  updateForm: FormGroup;

  submitForm(form) {
    console.log(form);
    console.log(form.value);
  }

  /*   Construtor */
  constructor(
    public formbuilder: FormBuilder,
    public popoverController: PopoverController,
    public postService: PostService,
    public authService: AuthService, 
    public router: Router,
    private route: ActivatedRoute) {
      this.commentForm = this.formbuilder.group({
        text: [null, [Validators.required, Validators.maxLength(140)]],
      });
      this.updateForm = this.formbuilder.group(
        {
        post_type:['postLivre', [Validators.required]],
        text:[null,[Validators.required]],
        title:[null],
        image:[null],
      })

      this.route.params.subscribe(
        (params) => {
          this.postId = params.postId;
          console.log(this.postId);
        });
    }

    callGetDetails() {
      this.authService.getDetails().subscribe(
        (res) => {
          this.userId = res.success.id;
          console.log('user', res);
        }, (err) => {
          console.log(err);
        }
      )
    }

    /*Função popover de opções do post */
    async presentPopover(event) {
      const popover = await this.popoverController.create({
        component: PostPopoverComponent, event
      });
      localStorage.setItem("post_id", this.postId);
      return await popover.present();
    }

    /* Integração */
    showPost(id) {
      this.postService.showPost(id).subscribe(
        (res) => {
          this.post = res.post;
          this.user = res.user;
          this.postUserId = res.user.id;
          console.log(this.post);
          console.log('post', this.user);
        }, (err) => {
          console.log(err);
        }
      );
    }

    toggleEdit(){ 
      this.editMode = true;
    }

    updatePost(form) {
      this.postService.updatePost(this.postId, form.value).subscribe(
        (res) => {
          this.editMode = false;
          console.log(res);
        }, (err) => {
          console.log(err);
        }
      );
    }

    /* Integração */
  deletePost(id) {
    this.postService.deletePost(this.postId).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/feed']);
        console.log('post deletado');
      }, (err) => {
        console.log(err);
      }
    );
  }

    
  ngOnInit() {
    this.showPost(this.postId);
    this.callGetDetails();
    
    this.comments = [
      {
        photo: 'https://www.colegioweb.com.br/wp-content/uploads/2017/08/Saiba-tudo-sobre-a-carreira-de-escritor.png',
        user: 'João de Assis',
        text: 'Bela história, desde sempre inspirando pensamentos e pessoas de forma magnífica. A presença de uma mulher na literatura brasileira é uma dádiva, sempre resulta em ótimas criações e perspectivas totalmente novas. Parebéns pela excelente escrita!'
      },
      {
        photo: 'https://super.abril.com.br/wp-content/uploads/2017/09/rotina-de-trabalho.png',
        user: 'Severino Barbacena',
        text: 'Que extraordinário, ansioso pelos próximos contos.'
      },
      {
        photo: 'https://flertai.com.br/wp-content/uploads/2017/06/silvia-loeb.jpg',
        user: 'Isabela Bonfim',
        text: 'Amei a história, ganhou mais uma fã!'
      },
      {
        photo: 'https://images-na.ssl-images-amazon.com/images/I/71g0MUj0iPL.jpg',
        user: 'Gabriela Macedo',
        text: 'Amei! Mas tenho uma dúvida clássica: Capitu traiu ou não traiu Bentinho? kkkkkk'
      }
    ];
  }
}
