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
  
  auth = localStorage.getItem("userToken")!==null;
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