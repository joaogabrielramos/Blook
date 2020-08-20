import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/*Services*/
import { CommentService } from 'src/app/services/comment/comment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  @Input() comment;

  @Output() trashClicked = new EventEmitter<number>();

  userId: number;
  isAdmin = 0;

  constructor(
    public commentService: CommentService,
    public authService: AuthService) { }
  
  
    ngOnInit() {
    this.callGetDetails();
  }

  callGetDetails() {
    this.authService.getDetails().subscribe(
      (res) => {
        this.userId = res.success.id;
        this.isAdmin = res.success.is_admin;
        console.log('user', res);
      }, (err) => {
        console.log(err);
      }
    )
  }

  showDeleteButton(){
    if (this.userId==this.comment.user.id || this.isAdmin==1) {
      return true;
    } else {
      return false;
    }
  }

  deleteComment(id){
    this.trashClicked.emit(id);
  }



}
