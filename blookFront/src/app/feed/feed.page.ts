import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { PostService } from "./../services/post/post.service";


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  feedPosts = [];

  constructor(
    public postService: PostService,
    public router: Router) {

    }

  ngOnInit() {
    this.listPostCards();
  }

    /* Integração */
    listPostCards() {
      this.postService.listPostCards().subscribe (
        (res) => {
          this.feedPosts = res;
          console.log(res);
        }, (err) => {
          console.log(err);
        }
      );
      }

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