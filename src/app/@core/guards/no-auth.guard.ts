import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { ROUTER_UTILS } from '../utils/router.utils';
import { RouteService } from './../services/route.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private routeService: RouteService,
  ) {}

  canLoad(): boolean {
    const isLoggedIn = this.authService.isLoggedIn;

    if (isLoggedIn) {
      this.router.navigate([
        this.routeService.clubName || '/',
        ROUTER_UTILS.config.base.home,
      ]);
      return false;
    }

    return true;
  }
}
