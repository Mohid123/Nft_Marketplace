/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable } from 'rxjs';
import { CustomDialogService } from './../../../@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-marketplace-search',
  templateUrl: './marketplace-search.component.html',
  styleUrls: ['./marketplace-search.component.scss']
})
export class MarketplaceSearchComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(
    private authService: AuthService,
    private customDialogService: CustomDialogService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.customDialogService.ShowUserSignInDialog();
  }

}
