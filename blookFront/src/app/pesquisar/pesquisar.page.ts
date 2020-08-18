import { Component, OnInit } from '@angular/core';

import _ from 'lodash';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {
    users:Array<{name:string}>;
    allUsers:any;
    queryText:string;


  constructor() {
    this.queryText ='';
    this.users = [
      {
        name:'Gabriel'
      },
      {
        name:'Douglas'
      },
      {
        name:'Isabella'
      },
      {
        name:'Ana'
      }
    ];

    this.allUsers = this.users;

   }

   filterUser(us:any){
     let val = us.target.value;
     if(val && val.trim()!=''){
       this.users = _.values(this.allUsers);
       this.users = this.users.filter((user)=>{
         return(user.name.toLowerCase().indexOf(val.toLowerCase())>-1);
       })
     }else{
       this.users = this.allUsers;
     }
   }

  ngOnInit() {

    
  }

}
