import { Component, OnInit, Input} from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

/* Services */
import { PostService } from "../../services/post/post.service";

@Component({
  selector: 'app-post-popover',
  templateUrl: './post-popover.component.html',
  styleUrls: ['./post-popover.component.scss'],
})
export class PostPopoverComponent implements OnInit {

  editMode:boolean = false;

  @Input() post;
  

  constructor(
    public popoverController: PopoverController,
    public router: Router,
    private route: ActivatedRoute,
    public postService: PostService) {
      /* this.route.params.subscribe(
        (params) => {
          this.postId = params.postId;
          console.log(this.postId);
        }) */
    }

  ngOnInit() {}

  close() {
    this.popoverController.dismiss();
    localStorage.removeItem('post_id');
  }


  /* Integração */
  deletePost() {
    this.postService.deletePost(localStorage.getItem('post_id')).subscribe(
      (res) => {
        this.close();
        this.router.navigate(['/feed']);
        console.log('post deletado');
      }, (err) => {
        console.log(err);
      }
    );
  }

  toggleEdit(id){ 
    this.editMode = true;
    console.log(id);
  }
}
