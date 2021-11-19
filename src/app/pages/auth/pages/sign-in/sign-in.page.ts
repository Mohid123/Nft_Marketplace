import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit , OnDestroy {
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private customDialogService: CustomDialogService,
  ) {
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn) return;

    if (
      (<string>this.activatedRoute.snapshot.data.page).includes(
        ROUTER_UTILS.config.auth.adminSignIn)
    ) {
      this.customDialogService.showAdminSignInDialog(true);
    } else {
      this.customDialogService.showUserSignInDialog(true);
    }
  }

  ngOnDestroy():void {
    // console.log('sign in page  distroy:',);
  }
}
