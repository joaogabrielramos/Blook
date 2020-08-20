import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';

import { BrMaskerModule } from 'br-mask';

/* Componentes */
import { TabmenuComponent } from '../components/tabmenu/tabmenu/tabmenu.component';
 
import { HeaderComponent } from '../components/header/header.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    ReactiveFormsModule,
    BrMaskerModule,
  ],
  declarations: [PerfilPage,TabmenuComponent,HeaderComponent]
})
export class PerfilPageModule {}
