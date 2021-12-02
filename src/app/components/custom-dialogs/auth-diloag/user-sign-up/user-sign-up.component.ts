import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatorService } from '@app/@core/services/creator.service';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { MediaService } from '@app/@core/services/media.service';
import { RouteService } from '@app/@core/services/route.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { ApiResponse } from '../../../../@core/models/response.model';
import { SignInResponse } from '../../../../@core/models/sign-in-response';
import { AuthService } from '../../../../pages/auth/services/auth.service';
import { ResponseAddMedia as ResponseAddMedia } from './../../../../@core/models/response-add-media.model';
import { SignUpCredentials } from './../../../../@core/models/sign-up-credentials';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss']
})
export class UserSignUpComponent {

  @Input() isPage: boolean;
  @Input() page: string;

  public signUpForm: FormGroup;
  public passwordHide: boolean;
  public clubName: string;

  public profileImage: any;
  public profileImg = new FormData();
  public profileImageSrc: any;

  creator$ = this.creatorService.Creator$;

  constructor(
    private authService: AuthService,
    private creatorService: CreatorService,
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
    private router: Router,
    private routeService: RouteService,
    private mediaService: MediaService,
    private toastrService: ToastrService,
    private toastr: ToastrService
  ) {
    this.routeService.clubName$.pipe(take(1)).subscribe((clubName) => {
      this.clubName = clubName;
    });
    this.signUpForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      profileImg: new FormControl(''),
    });
    this.passwordHide = true;
  }

  signUpClick(): void {
    if(this.profileImageSrc) {
      this.uploadProfilePic();
    } else {
      this.createUser();
    }
  }

  uploadProfilePic():void {
    this.mediaService
      .uploadMedia('user', this.profileImageSrc)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (!res.hasErrors()) {
          this.createUser(res.data);
        } else {
          this.toastrService.warning(res?.errors[0]?.error?.message, 'Error!');
        }
      });
  }

  createUser(data? :ResponseAddMedia):void {
    const params: SignUpCredentials = {
      name: this.signUpForm.controls.name.value,
      email: this.signUpForm.controls.email.value,
      pass: this.signUpForm.controls.password.value,
      profilePicURL: this.profileImageSrc ? data.url : '',
      clubName: this.clubName,
    };
    this.authService
      .userSignUp(params,this.page == 'market-page')
      .pipe(take(1))
      .subscribe((res:ApiResponse<SignInResponse>) => {
        if (!res.hasErrors()) {
          this.toastr.success(`You're logged in.`, 'Welcome!')
          this.customDialogService.closeDialogs();
          if(this.isPage) {
            this.router.navigate(['/'+this.clubName])
          }
        } else {
          // alert(res?.errors[0]?.error?.message);
          this.toastr.warning(res?.errors[0]?.error?.message, 'Invalid!' )
        }
      });
  }

  onSelectProfile(event): void {
    console.log('selecgt img:',);
    if (event.target.files && event.target.files[0]) {
      this.profileImage = event.target.files[0];
      this.signUpForm.controls.profileImg.setValue(this.profileImage);
      this.profileImg.append('file', this.signUpForm.get('profileImg').value);
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log('img ccrop:',);
          this.customDialogService.showImageCropperDialog(event, 1 / 1,true).then(matRef => {
            matRef.afterClosed().subscribe((result) => {
              console.log('showImageCropperDialog:',result);
              if(result)
                this.profileImageSrc = result;
              else {
                this.profileImageSrc = null;
                this.profileImage = null;
                this.signUpForm.controls.profileImg.setValue(null);
                // this.profileFile.nativeElement.value = "";
              }
            });
          })
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  passwordShowHide(): void {
    this.passwordHide = !this.passwordHide;
  }

  close() {
    this.customDialogService.closeDialogs();
  }
}
