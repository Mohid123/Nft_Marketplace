import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';
import { ROUTER_UTILS } from './../../../../@core/utils/router.utils';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.scss']
})
export class AdminSignInComponent {

  public loginForm: FormGroup;
  public passwordHide: boolean;

  constructor(
    private authService: AuthService,
    private customDialogService: CustomDialogService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
      this.loginForm = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ])
      });
      this.passwordHide= true;
    }

  signInClick(): void {
    this.authService.adminSignIn().then(()=> {
      this.router.navigateByUrl('/'+ROUTER_UTILS.config.admin.root).then(() => {
        this.customDialogService.closeDialogs();
      });
    })
  }

}
