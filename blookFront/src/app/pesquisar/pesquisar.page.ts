import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { Router } from '@angular/router';

/* Services */
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {
    users:Array<{name:String}>;
    queryText:string;
    allUsers:any;

    posts=[]
    allPosts:any;
    
    auth=localStorage.getItem('userToken')!==null;

    userSearchMode: boolean = false;


  constructor(public router: Router,
    public searchService: SearchService) {
    this.queryText='';
    
    this.allUsers = this.users;
    this.allPosts = this.posts;
    
  }

  ngOnInit() {
    this.listUser();
    this.listPost();
    
  }

  /* Rotas */
  navigateToProfileUser(id){
    this.router.navigate(['/perfil', {'profileUserId': id}]);
    console.log(id);
  }

  navigateToPost(id) {
    this.router.navigate(['/post', {'postId': id}]);
    console.log(id);
  }


  /* Toggles */
  toggleModesOfSearch(){
      this.userSearchMode = true;
  }

  togglePost() {
    this.userSearchMode = false;
  }

  listUser(){
    this.searchService.listUsers().subscribe(
      (res)=>{
        console.log(res);
        this.users=res[0];
        this.allUsers = res[0];
      },(err) =>{
        console.log(err);
      });
  }


  filterUser(us:any){
    let val = us.target.value;
    if(val && val.trim() !=''){
      this.users = _.values(this.allUsers);
      this.users = this.users.filter((user)=>{
        return (user.name.toLowerCase().indexOf(val.toLowerCase())>-1)
      })
    }else{
      this.users = this.allUsers;
      
    }
  }

  listPost(){
    this.searchService.listPosts().subscribe(
      (res)=>{
        console.log(res);
        this.posts= res[0];
        this.allPosts=res[0];
        this.userSearchMode = false;
        
      },(err) =>{console.log(err);}
      
    )
  }
  
  filterPost(pos:any){
    let val = pos.target.value;
    if(val && val.trim() !=''){
      this.posts = _.values(this.allPosts);
      this.posts = this.posts.filter((post)=>{
        return (post.title.toLowerCase().indexOf(val.toLowerCase())>-1)
      })
    }else{
      this.posts = this.allPosts;
    }
  }







}




