import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';
import { RouteService } from './../../../../@core/services/route.service';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent {

  public user$ = this.authService.user$;

  constructor(
    private authService: AuthService,
    private customDialogService: CustomDialogService,
    private router: Router,
    private routeService: RouteService,
    private toastr: ToastrService
  ) {

  }

  signOut():void {
    this.router.navigate([this.routeService.clubName]).then(()=> {
      this.authService.signOut();
    });
    this.toastr.success(`You've logged out.`, 'Logout!')
  }

  exportKey() {
    this.customDialogService.showExportKeyDialog();
  }

}
