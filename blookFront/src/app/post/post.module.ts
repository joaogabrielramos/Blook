import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post.page';

/* Componentes */
import { TabmenuComponent } from '../components/tabmenu/tabmenu/tabmenu.component';
import { CommentComponent } from '../components/comment/comment.component';
import { PostPopoverComponent } from '../components/post-popover/post-popover.component';
import { HeaderComponent } from '../components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [PostPopoverComponent],
  declarations: [PostPage, TabmenuComponent, CommentComponent, PostPopoverComponent, HeaderComponent]
})
export class PostPageModule {}
