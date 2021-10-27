import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { take } from 'rxjs/operators';
import { AuthCredentials } from './../../../../@core/models/auth-credentials.model';
import { ApiResponse } from './../../../../@core/models/response.model';
import { SignInResponse } from './../../../../@core/models/sign-in-response';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';
import { RouteService } from './../../../../@core/services/route.service';
import { ROUTER_UTILS } from './../../../../@core/utils/router.utils';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.scss']
})
export class AdminSignInComponent implements OnInit {

  @Input() isPage: boolean;

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
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.passwordHide = true;
  }

  ngOnInit(): void {
    this.routeService.clubName$.pipe(take(1)).subscribe((clubName) => {
      this.clubName = clubName;
    });
  }

  signInClick(): void {
    const params: AuthCredentials = {
      email: this.loginForm.controls.email.value,
      pass: this.loginForm.controls.password.value,
      clubName: this.clubName,
    };

  this.authService
  .adminSignIn(params)
  .pipe(take(1))
  .subscribe((res:ApiResponse<SignInResponse>) => {
    if (!res.hasErrors()) {
      this.customDialogService.closeDialogs();
      if(this.isPage) {
        this.router.navigate(['/'+this.clubName + '/' +ROUTER_UTILS.config.admin.root])
      }
    } else {
          alert(res?.errors[0]?.error?.message);
        }
        this.customDialogService.closeDialogs();
      });
    }

}
