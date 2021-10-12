import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }

  signOut():void {
    this.authService.signOut();

    if(this.authService.role == ROLE_TYPE_UTILS.admin) {
    const { root, adminSignIn } = ROUTER_UTILS.config.auth;
    this.router.navigate(['/', root, adminSignIn]);
    } else {
      const { root, signIn } = ROUTER_UTILS.config.auth;
      this.router.navigate(['/', root, signIn]);
    }
  }
}
