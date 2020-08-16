import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* Services */
import { PostService } from "./../services/post/post.service";
import { PopoverController } from '@ionic/angular';
import { PostPopoverComponent } from '../components/post-popover/post-popover.component';

class Post {
  photoUser: string;
  user: string;
  title: string;
  photoPost: string;
  text: string; 
}

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
  posts: Post[];
  comments: Comment[];

  commentForm: FormGroup;

  submitForm(form) {
    console.log(form);
    console.log(form.value);
  }
  
  /*   Construtor */
  constructor(
    public formbuilder: FormBuilder,
    public popoverController: PopoverController,
    public postService: PostService,
    public router: Router) {
      this.commentForm = this.formbuilder.group({
        text: [null, [Validators.required, Validators.maxLength(140)]],
      });
    }

    /*Função popover de opções do post */
    async presentPopover(event) {
      const popover = await this.popoverController.create({
        component: PostPopoverComponent, event
      });
      return await popover.present();
    }

    /* Integração */
    showPost(id) {
      this.postService.showPost(id).subscribe(
        (res) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        }
      );
    }

    /* updatePost(form) {
      this.postService.updatePost(, form.value).subscribe(
        (res) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        }
      );
    } */

    
  ngOnInit() {
    this.posts = [
      {
        photoUser:"https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2018/03/formacao_1600x1200-como-a-presenca-da-mulher-pode-ser-harmonia-no-mundo.jpg",
        user:"Lorem",
        title: "A menina que roubava livros",
        photoPost:"https://i.zst.com.br/images/livros-na-black-friday-2019-confira-nossas-apostas-photo946164244-44-1a-2f.jpg",
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consequat vel ligula eget ultricies. Duis eu mattis ligula. Quisque lobortis risus tortor, ut pulvinar lectus mattis vel. Duis cursus elementum posuere. Phasellus egestas ut mauris at maximus. Vestibulum fermentum vel leo non bibendum. Nullam vestibulum efficitur ipsum id molestie.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus felis quam, pretium id lorem quis, aliquam posuere turpis. Cras in placerat risus. Aliquam sit amet erat quis nunc eleifend tincidunt. Vestibulum viverra mi eget nibh volutpat, sed imperdiet nisl pretium. Aliquam posuere lacus id lectus scelerisque, eu condimentum neque accumsan. Quisque nec eros in sapien elementum pellentesque. Proin vulputate sodales urna. Fusce viverra quis purus eu eleifend. Aenean vel sollicitudin augue, vel suscipit magna. Nullam convallis tristique nibh, sodales venenatis mi tincidunt in. Sed rhoncus gravida nisl. Phasellus sed leo lorem.Proin laoreet massa gravida scelerisque maximus. Vestibulum volutpat finibus purus vitae dignissim. Donec eleifend aliquet justo, et venenatis felis porta quis. Duis efficitur eget neque et vestibulum. Aliquam in interdum nulla. Sed egestas, elit ac rutrum viverra, est risus ultricies quam, vel porta dolor nunc eu ante. Suspendisse ut mattis metus. Sed leo est, dignissim sed ante et, efficitur blandit ante.Nunc auctor tempor ultrices. Praesent et sodales augue. Sed sit amet ante in turpis blandit vulputate a feugiat arcu. Sed scelerisque laoreet quam, a tincidunt dui ornare rutrum. Nam tortor risus, aliquam ac ligula consectetur, finibus convallis felis. Aliquam eu sem facilisis massa faucibus venenatis. Vivamus molestie, ipsum quis interdum tempor, risus nunc ullamcorper eros, ut molestie mauris libero non nisi. Aenean maximus quam nec augue pulvinar, vitae gravida velit aliquam. Donec condimentum elit vel velit bibendum, sit amet rutrum odio auctor. Maecenas vitae eleifend dui. Cras molestie nulla justo, nec vulputate metus eleifend et. Proin felis arcu, porta sed ante et, laoreet blandit ante. Aenean molestie vitae lorem sit amet venenatis. Quisque efficitur pretium est, in vestibulum dolor consequat quis. Suspendisse ultricies nibh et molestie ornare. Fusce vitae dapibus ligula.'
      }
    ];
    
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
