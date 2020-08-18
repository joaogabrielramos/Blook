import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';

/* Componentes */
import { TabmenuComponent } from '../components/tabmenu/tabmenu/tabmenu.component';
 
import { HeaderComponent } from '../components/header/header.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    
  ],
  declarations: [PerfilPage,TabmenuComponent,HeaderComponent]
})
export class PerfilPageModule {}
