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
  userId = -2;
  postUserId = -1;

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
        this.comments=res.comments;
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
    
  ngOnInit() {
    this.showPost(this.postId);
    this.callGetDetails();
    this.listComments(this.postId);
  }
}
