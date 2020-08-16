import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { PostService } from "./../services/post/post.service";

class FeedPost {
  photoUser: string;
  user: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  feedPosts: FeedPost[];

  constructor(
    public postService: PostService,
    public router: Router) {

    }

  ngOnInit() {
    this.feedPosts = [
      {
        photoUser:'https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2018/03/formacao_1600x1200-como-a-presenca-da-mulher-pode-ser-harmonia-no-mundo.jpg',
        user:'Lorem',
        title: 'A menina que roubava livros',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consequat vel ligula eget ultricies. Duis eu mattis ligula. Quisque lobortis risus tortor, ut pulvinar lectus mattis vel. Duis cursus elementum posuere. Phasellus egestas ut mauris at maximus. Vestibulum fermentum vel leo non bibendum. Nullam vestibulum'
      }];
  }

  /* listPosts() {
    this.postService.listPosts().subscribe(
      (res) => {
        console.log(res);
        this.posts=res.posts;
      }, (err) => {
        console.log(err);
      }
    );
  } */

}


 //ngfor na pagina do feed com o card component
 //para cada um, o click esta setado pra função navigate do ts
 //dentro do ts, cria essa função e joga o trecho que ela mandou this.router.navigate(['/post', {'postId': parametroDaFuncao}]);
 // importa isso no post.page.ts import { ActivatedRoute } from 'router';

 //na post.page.ts:
//1. import { ActivatedRoute } from 'router';
//2. nos parâmetros do construtor: constructor (private route: ActivatedRoute)
//3. dentro do ngOnInit ou dentro do construtor: this.route.params.subscribe((params) => (this.postId = params.postId));
//postId = Number(postId)