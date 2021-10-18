import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthCredentials } from './../../../../@core/models/auth-credentials.model';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';
import { RouteService } from './../../../../@core/services/route.service';
import { AuthService } from './../../../../pages/auth/services/auth.service';

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss'],
})
export class UserSignInComponent {
  public loginForm: FormGroup;
  public passwordHide: boolean;
  public clubName: string;

  constructor(
    private authService: AuthService,
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
    private router: Router,
    private routeService: RouteService,
  ) {
    this.routeService.routerState$.pipe(take(1)).subscribe((routerState) => {
      this.clubName = routerState?.params?.clubName;
    });
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.passwordHide = true;
  }

  signInClick(): void {
    const params: AuthCredentials = {
      email: this.loginForm.controls.email.value,
      pass: this.loginForm.controls.password.value,
      clubName: this.clubName,
    };
    this.authService
      .userSignIn(params)
      .pipe(take(1))
      .subscribe((result) => {
        this.customDialogService.closeDialogs();
        this.router.navigate(['/']);
      });
  }

  passwordShowHide(): void {
    this.passwordHide = !this.passwordHide;
  }

  close() {
    this.customDialogService.closeDialogs();
  }
}
