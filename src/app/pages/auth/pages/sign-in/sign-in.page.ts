import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit , OnDestroy {
  returnUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customDialogService: CustomDialogService,
  ) {}

  ngOnInit(): void {
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
    console.log('sign in page  distroy:',);
  }
}
