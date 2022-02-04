import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatorService } from '@app/@core/services/creator.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AuthCredentials } from './../../../../@core/models/auth-credentials.model';
import { ApiResponse } from './../../../../@core/models/response.model';
import { SignInResponse } from './../../../../@core/models/sign-in-response';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';
import { RouteService } from './../../../../@core/services/route.service';
import { AuthService } from './../../../../pages/auth/services/auth.service';

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss'],
})
export class UserSignInComponent {

  @Input() isPage: boolean;
  @Input() page: string;

  public loginForm: FormGroup;
  public passwordHide: boolean;
  public clubName: string;

  creator$ = this.creatorService.Creator$;

  constructor(
    private authService: AuthService,
    private creatorService: CreatorService,
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
    private router: Router,
    private routeService: RouteService,
    private toastr: ToastrService
  ) {
    this.routeService.clubName$.pipe(take(1)).subscribe((clubName) => {
      this.clubName = clubName;
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
      .userSignIn(params,this.page == 'market-page')
      .pipe(take(1))
      .subscribe((res:ApiResponse<SignInResponse>) => {
        if (!res.hasErrors()) {
          this.toastr.success(`You're logged in.`, 'Welcome!')
          this.customDialogService.closeDialogs();
          if(this.isPage) {
            this.router.navigate(['/'+this.clubName])
          }

          if(this.page == 'market-page' && res?.data?.user?.admin) {
            if(this.authService.isLoggedIn && !this.creatorService.Creator?.stripeSecretKey) {
              this.customDialogService.showStripeKeyDialog();
            }
          }
        } else {
          // alert(res?.errors[0]?.error?.message);
          this.toastr.warning(res?.errors[0]?.error?.message, 'Invalid!' )
        }
      });
  }

  passwordShowHide(): void {
    this.passwordHide = !this.passwordHide;
  }

  signUp() {
    this.customDialogService.showUserSignUpDialog();
  }

  close() {
    this.customDialogService.closeDialogs();
  }

  canShowSignUp() : boolean {
    return this.clubName.toUpperCase() === 'CSKA';
  }
}
