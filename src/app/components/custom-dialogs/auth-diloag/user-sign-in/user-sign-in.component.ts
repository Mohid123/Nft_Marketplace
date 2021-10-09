import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';
import { AuthService } from './../../../../pages/auth/services/auth.service';

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent {

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
    this.authService.userSignIn().then(()=> {
      this.customDialogService.closeDialogs();
      this.router.navigate(['/']);
    })
  }

}
