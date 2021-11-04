import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../pages/auth/services/auth.service';
import { ROUTER_UTILS } from './../utils/router.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService?.isLoggedIn) {
      return true;
    } else {
      this.router.navigate([route?.params?.clubName || '/', ROUTER_UTILS.config.auth.root,ROUTER_UTILS.config.auth.signIn]);
      return false;
    }
  }

}
