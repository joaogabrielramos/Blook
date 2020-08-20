import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

/* Services */
import { PostService } from "./../services/post/post.service";
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment/comment.service';

import { PopoverController } from '@ionic/angular';

import { PostPopoverComponent } from '../components/post-popover/post-popover.component';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  
  /* Variáveis */
  post = [];
  user = [];
  comments = [];
  postId: any;
  userId = 0;
  postUserId = -1;
  liked: boolean;
  isAdmin: number;

  
  auth=localStorage.getItem('userToken')!==null;

  editMode:boolean = false;

  commentForm: FormGroup;
  updateForm: FormGroup;
  
  


  /*   Construtor */
  constructor(
    public formbuilder: FormBuilder,
    public popoverController: PopoverController,
    public postService: PostService,
    public authService: AuthService,
    public commentService: CommentService, 
    public router: Router,
    private route: ActivatedRoute) {
      this.commentForm = this.formbuilder.group({
        text: [null, [Validators.required, Validators.maxLength(140)]],
      });
      this.updateForm = this.formbuilder.group(
        {
        post_type:[[Validators.required]],
        text:[[Validators.required]],
        title:[[Validators.required]],
        image:[],
      })

      this.route.params.subscribe(
        (params) => {
          this.postId = params.postId;
          console.log(this.postId);
        });
    }

    ngOnInit() {
      this.showPost(this.postId);
      this.callGetDetails();
      this.listComments(this.postId);
      this.showDeleteButton();
    }

    callGetDetails() {
      this.authService.getDetails().subscribe(
        (res) => {
          this.userId = res.success.id;
          this.isAdmin = res.success.is_admin;
        }, (err) => {
          console.log(err);
        }
      )
    }

    showDeleteButton(){
      if (this.userId==this.postUserId || this.isAdmin==1) {
        return true;
      } else {
        return false;
      }
    }

    showDeleteCommentButton(commentUserId){ 
      if (this.userId==commentUserId || this.isAdmin==1) {
        return true;
      } else {
        return false;
      }
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
      this.postService.showPost(id, this.userId).subscribe(
        (res) => {
          this.post = res.post;
          this.user = res.user;
          this.postUserId = res.user.id;
          this.liked = res.liked;
        }, (err) => {
          console.log(err);
        }
      );
    }

    likePost() {
      this.postService.likePost(this.postId).subscribe(
        (res) => {
          console.log(res);
          this.liked = res.response;
        }, (err) => {
          console.log(err);
        }
      )
    }

    toggleEdit(){ 
      this.editMode = true;
    }

    updatePost(form) {
      this.postService.updatePost(this.postId, form.value).subscribe(
        (res) => {
          this.editMode = false;
          this.showPost(this.postId);
          console.log(res);
        }, (err) => {
          console.log(err);
        }
      );
    }

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

  listComments(postId) {
    this.commentService.listComments(this.postId).subscribe(
      (res) => {
        console.log(res);
        this.comments=res;
        console.log(this.comments);
      }, (err) => {
        console.log(err);
      }
    );
  }

  createComment(form) {
    this.commentService.createComment(this.postId, form.value).subscribe(
      (res) => {
        console.log(res);
        this.listComments(this.postId);
        this.commentForm.reset();
      }, (err) => {
        console.log(err);
      }
    );

  }

  deleteComment(id) {
    this.commentService.deleteComment(id).subscribe(
      (res) => {
        this.listComments(this.postId);
        console.log(res);
      }, (err) => {
        console.log(err);
      }
    )
  }
    
}
