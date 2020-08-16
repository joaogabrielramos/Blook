import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit {

  @Input() feedPost;

  constructor(public router: Router) { }

  ngOnInit() {}

  navigateToPost(id) {
    this.router.navigate(['/post', {'postId': id}]);
    console.log(id);
  }

}
