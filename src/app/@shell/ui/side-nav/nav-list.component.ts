/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, Validators
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { flyInOut } from '@app/@core/animations/app.animation';
import { Creator } from '@app/@core/models/creator.model';
import { ApiResponse } from '@app/@core/models/response.model';
import { CreatorService } from '@app/@core/services/creator.service';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { FireAuthService } from '@app/@core/services/fire-auth.service';
import { MediaService } from '@app/@core/services/media.service';
import { UserService } from '@app/@core/services/user.service';
// firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, of, Subject } from 'rxjs';
import { exhaustMap, take, takeUntil } from 'rxjs/operators';
import { NodechainUser } from './../../../@core/models/nodechain-user.model';
import { ResponseAddMedia } from './../../../@core/models/response-add-media.model';
import { ROUTER_UTILS } from './../../../@core/utils/router.utils';

// export function passwordsMatchValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const password = control.get('password')?.value;
//     const confirmPassword = control.get('confirmPassword')?.value;

//     if (password && confirmPassword && password !== confirmPassword) {
//       return { passwordsDontMatch: true };
//     } else {
//       return null;
//     }
//   };
// }

const fireConfig = {
  apiKey: "AIzaSyCHyGMm-OaTigJU1l3ynVH8L0enkl34xPI",
  authDomain: "nft-auth-app.firebaseapp.com",
  projectId: "nft-auth-app",
  storageBucket: "nft-auth-app.appspot.com",
  messagingSenderId: "242147439537",
  appId: "1:242147439537:web:9e9a6a2b494a05ce7ec390",
  measurementId: "G-WD23R4NTBM"
}


@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
      flyInOut()
    ]
})
export class NavListComponent implements OnInit {
  destroy$ = new Subject();

  @ViewChild('imgFile') imgFile;
  @ViewChild('stepper') private myStepper: MatStepper;
  firstFormGroup: FormGroup;
  creatorForm: FormGroup;
  public profileImage: any;
  public profileImg = new FormData();
  public profileImageSrc: any;
  UserForm: FormGroup;
  display: any;
  adminRouteUrl = ROUTER_UTILS.config.base.home;

  showLoading: boolean = false;

  countryCode: number;
  otp!: string;
  verify: any;
  public passwordHide: boolean;
  phoneNumber: any;
  reCaptchaVerifier: any;
  payload: any

  fullname: any;
  email: any;
  password: any;
  confirmPassword: any

  public groupFile: any;
  public imageSrc: any;
  public groupimgFormData = new FormData();

  constructor( private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cf: ChangeDetectorRef,
    public fireAuth: FireAuthService,
    private customDialogService: CustomDialogService,
    private mediaService: MediaService,
    private creatorService: CreatorService,
    private userService: UserService,
    private route: Router) {
      this.creatorForm = this._formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]),
        // groupFile: new FormControl(''),
        // fileName: new FormControl(''),
        // img: new FormControl(''),
        profileImg: new FormControl(''),
        profileImage: new FormControl(''),
      });

      this.passwordHide = true;
    }
    config = {
      allowNumbersOnly: true,
      length: 6,
      isPasswordInput: false,
      disableAutoFocus: true,
      timer: 1,
      placeholder: '',
      inputStyles: {
        width: '50px',
        height: '50px',
      }
    }
  ngOnInit() {
    // window.location.reload()

    this.UserForm = this._formBuilder.group( {
      fullname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    // { validators: passwordsMatchValidator() }
    )

    firebase.initializeApp(fireConfig)
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}')

  }

  timer(minute) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
      }
    }, 1000);
  }

  passwordShowHide(): void {
    this.passwordHide = !this.passwordHide;
  }

 async signup() {
   await this.fireAuth.signup(this.fullname, this.email, this.password);
  }

   createNodechainUser() {
     debugger
    const payload: NodechainUser = {
      name: this.fullname,
      pass: this.password,
      email: this.email,
      phoneNumber: `+${this.countryCode}`+this.phoneNumber,
      clubName: this.creatorForm.value.name,
      appPackageId: (this.creatorForm.value.name).toLowerCase().replace(/\s/g,'')
      // profilePicURL: 'https://api.solissol.com/api/v1/en/media-upload/mediaFiles/profilepics/0I7KH97u1JOpUAEfpfA7lc7oyhD2/86771a2591c445395929d5e938cef6b7.png'
    }

    // this.fireAuth.signup(this.fullname, this.email, this.password);
    this.signup().then(() => {
      debugger
      this.userService.createUser(payload).pipe(takeUntil(this.destroy$)).subscribe((res: ApiResponse<NodechainUser>) => {
        if(!res.hasErrors()) {
          this.toastr.success('User Created Successfully', 'Success');
          this.route.navigate([''])
        }
        else {
          this.toastr.error('Failed To Create New User', 'Create User');
        }
      })
    }).catch((error)=> {
      this.toastr.error(error, 'Something went wrong')
    })
  }


  getOTP() {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier
    ('sign-in-button',
    {size: 'invisible'
    },
    )
    // if (!this.countryCode || !this.phoneNumber) {
    //   this.toastr.error('Please enter valid login details(registered phone number) to continue.', 'Invalid!')
    //   return
    // }
    this.timer(1);

    this.payload = {
      phoneNumber: `+${this.countryCode}`+this.phoneNumber
      // phoneNumberPrefix: `+${this.countryCode}`
    }
    firebase
    .auth()
    .signInWithPhoneNumber(this.payload, this.reCaptchaVerifier)
    .then((res)=> {
      console.log(res);
      localStorage.setItem('verificationId', JSON.stringify(res.verificationId))
      // debugger
      this.myStepper.next();
      this.toastr.success('We have sent an otp. Please fill in the below fields to continue.', 'Verify')
    }).catch((error)=> {
      this.toastr.error(error.message)
      setTimeout(() => {
        window.location.reload()
      }, 1000);
      // this.myStepper.previous();
    })
  }

  resend() {
  this.getOTP()
  }

  onOtpChange(otpCode: any) {
    this.otp = otpCode
    console.log(this.otp)
  }

  handleClick() {
    const credentials = firebase.auth.PhoneAuthProvider.credential(this.verify, this.otp);
    firebase
    .auth()
    .signInWithCredential(credentials)
    .then((res) => {
      console.log(res)
      this.toastr.success('Your phone number is verified.', 'Success!')
      this.myStepper.next();
      localStorage.setItem('user_data',JSON.stringify(res))
    }).catch((error) => {
      this.toastr.error(error.message)
      setTimeout(() => {
        window.location.reload()
      }, 1000);
      // this.myStepper.previous();
    })
  }

  onCountryChange(country) {
    this.countryCode = country.dialCode
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  onSelectProfile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.profileImage = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.cropProfileImg(event);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  cropProfileImg(event) {
    this.creatorForm.controls.profileImage.setValue(event);
    this.customDialogService
      .showImageCropperDialog(event, 3.88 / 1, false)
      .then((matRef) => {
        matRef.afterClosed().subscribe((result) => {
          // console.log('showImageCropperDialog:',result);
          if (result) {
            this.profileImageSrc = result;
            this.creatorForm.patchValue({
              profileImg: this.mediaService.dataURLtoFile(
                this.profileImageSrc,
                this.profileImage.name,
              ),
            });
            this.profileImg.append(
              'file',
              this.creatorForm.get('profileImg').value,
            );
          } else {
            this.resetProfileImg();
          }
        });
      });
  }

  resetProfileImg() {
    this.profileImageSrc = null;
    this.profileImage = null;
    this.creatorForm.controls.profileImg.setValue(null);
    this.imgFile.nativeElement.value = '';
  }

  editImg():void {
    debugger
    this.profileImg.delete('file');
    this.cropProfileImg(this.creatorForm.controls.profileImage?.value);
  }


  addCreator() {
    this.showLoading = true;
    const mediaUpload:any = [];
    if(this.profileImageSrc){
      mediaUpload.push(this.mediaService.uploadMedia('creator', this.profileImg));
    }
    combineLatest(mediaUpload)
    .pipe(take(1),
    exhaustMap((res: ApiResponse<ResponseAddMedia>) => {
      if(!res[0].hasErrors()) {
        debugger
        const param: Creator = {
          displayName: this.creatorForm.controls.name.value,
          appPackageId: (this.creatorForm.controls.name.value).toLowerCase().replace(/\s/g,''),
          profileImageURL: res[0].data.url,
          isWithoutApp: true
        };
        if (res[0] && res[1] && !res[1].hasErrors()) {
          param.profileImageURL = res[1].data.url
        }
        return this.creatorService.addCreator(param);
      } else {
        return of(null);
      }
    }),
    )
    .subscribe((res:any) => {
      console.log(res)
      if (res !== null && !res.hasErrors()) {
        this.cf.detectChanges();
        // this.toastr.success('New creator successfully added.', 'Success!');
        this.customDialogService.showSuccessDialog('HELLo')
            setTimeout(() => {
              this.customDialogService.closeDialogs();
            }, 3000);
        this.showLoading = false;
        this.myStepper.next();
      } else {
        this.toastr.error(res.errors[0]?.error?.message, 'Error!');
       }
    })

  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }


}
