import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post.page';

/* Componentes */
import { TabmenuComponent } from '../components/tabmenu/tabmenu/tabmenu.component';
import { CommentComponent } from '../components/comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PostPage, TabmenuComponent, CommentComponent]
})
export class PostPageModule {}
