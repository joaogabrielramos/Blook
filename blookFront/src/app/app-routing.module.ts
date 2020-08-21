import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user/user.guard';
import { VisitantGuard } from './guards/visitant/visitant.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/feed',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),canActivate:[VisitantGuard]
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule),canActivate:[UserGuard]
  },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),canActivate:[UserGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
    
  },
  {
    path: 'criar-post',
    loadChildren: () => import('./criar-post/criar-post.module').then( m => m.CriarPostPageModule),canActivate:[VisitantGuard]
  },
  {
    path: 'popover-component',
    loadChildren: () => import('./popover-component/popover-component.module').then( m => m.PopoverComponentPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),canActivate:[VisitantGuard]
  },
  {
    path: 'pesquisar',
    loadChildren: () => import('./pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
