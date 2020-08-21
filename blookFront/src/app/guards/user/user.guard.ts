import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service'


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(public router: Router,
    public authService : AuthService
    ){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLoggedIn()){
        return this.router.navigate(['/feed'])
      }else{

      return true
      }


    
    }
}