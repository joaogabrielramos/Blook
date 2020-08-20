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

  feedPosts;

  feedMode: boolean = false;

  auth = localStorage.getItem("userToken")!==null;
  
  
  constructor(
    public postService: PostService,
    public router: Router) {

    }

  ngOnInit() {
    this.listPostCards();
    
  }

  toggleAllPosts(){
    this.feedMode = true;
    this.changeFeedPosts();
}

  toggleFollowingPosts() {
    this.feedMode = false;
    this.changeFeedPosts();
  }


    /* Integração */
    listPostCards() {
      this.postService.listPostCards().subscribe(
        (res) => {
          this.feedPosts = res;
          console.log(res);
        }, (err) => {
          console.log(err);
        }
      );
      }
    
    listFollowingPosts() {
      this.postService.listFollowingPosts().subscribe(
        (res) => {
          console.log('sigo', res);
          this.feedPosts = res;
        }, (err) => {
          console.log(err);
        }
      );
    }

    changeFeedPosts() {
      if(this.feedMode == true) {
          this.listPostCards();
      } else {
          this.listFollowingPosts();
          console.log(this.feedPosts);
      }
  }
}