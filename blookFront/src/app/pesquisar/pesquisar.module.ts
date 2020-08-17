import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesquisarPageRoutingModule } from './pesquisar-routing.module';

import { PesquisarPage } from './pesquisar.page';

/* Componentes */
import { TabmenuComponent } from '../components/tabmenu/tabmenu/tabmenu.component';
 
import { HeaderComponent } from '../components/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesquisarPageRoutingModule
  ],
  declarations: [PesquisarPage,TabmenuComponent,HeaderComponent]
})
export class PesquisarPageModule {}
