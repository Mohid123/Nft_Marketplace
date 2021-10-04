import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../pages/auth/services/auth.service';
import { ROLE_TYPE_UTILS } from './../utils/role-type.utils';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements  CanActivate {


  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn$.getValue()) {

      const userRole = this.authService.role$.getValue();
      if(userRole == ROLE_TYPE_UTILS.admn) {
        if (route.data.role && route.data.role.indexOf(userRole) === -1) {
          this.router.navigate(['/']);
          return false;
        }
      } else if(userRole == ROLE_TYPE_UTILS.user) {
        if (route.data.role && route.data.role.indexOf(userRole) === -1) {
          this.router.navigate(['/']);
          return false;
        }
      }
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
