/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { flyInOut } from '@app/@core/animations/app.animation';
import { BecomeCreator } from '@app/@core/models/become-a-creator.model';
import { ApiResponse } from '@app/@core/models/response.model';
import { ConnService } from '@app/@core/services/conn.service';
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
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, exhaustMap, map, take } from 'rxjs/operators';
import { ResponseAddMedia } from './../../../@core/models/response-add-media.model';
import { ROUTER_UTILS } from './../../../@core/utils/router.utils';
import { ConfirmedValidator } from './password.validator';


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
};




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
    ],
   encapsulation: ViewEncapsulation.None
})
export class NavListComponent implements OnInit, AfterViewInit {
  destroy$ = new Subject();

  defaultUser: BecomeCreator = {
    email: "",
    name: "",
    pass: "",
    phoneNumber: "",
    creatorDisplayName: ""
   };

  @ViewChild('imgFile') imgFile;
  @ViewChild('stepper') private myStepper: MatStepper;
  @ViewChild('menu') menu!: ElementRef
  public settings = {
    length: 6,
    numbersOnly: true,
    timer: 120,
    timerType: 1
  }
  firstFormGroup: FormGroup;
  creatorForm: FormGroup;
  public profileImage: any;
  public profileImg = new FormData();
  public profileImageSrc: any;
  UserForm: FormGroup;
  display: any;
  adminRouteUrl = ROUTER_UTILS.config.base.home;

  showLoading: boolean = false;

  showPhoneLoading: boolean = false;
  showVerifyOtp: boolean = false;

  countryCode = 359;
  otp: any;
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
    private fb: FormBuilder,
    private cf: ChangeDetectorRef,
    public fireAuth: FireAuthService,
    private customDialogService: CustomDialogService,
    private mediaService: MediaService,
    private creatorService: CreatorService,
    private userService: UserService,
    private connService : ConnService,
    private route: Router) {
      // this.creatorForm = this._formBuilder.group({
      //   name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      //   profileImg: new FormControl(''),
      //   profileImage: new FormControl(''),
      // });

      this.passwordHide = true;
    }
    config = {
      allowNumbersOnly: true,
      length: 6,
      isPasswordInput: false,
      disableAutoFocus: false,
      timer: 1,
      placeholder: '',
      inputStyles: {
        width: '50px',
        height: '50px',
      }
    }
  ngOnInit() {

    this.iniitCreatorForm()
    firebase.initializeApp(fireConfig)
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}')

  }

  emailValidator() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.valueChanges || control.pristine) {
        return null;
      }
      else {
        return this.userService.emailExists(control.value).pipe(
          distinctUntilChanged(),
          debounceTime(600),
          map((res: ApiResponse<any>) => (res.data.Response == true ? {emailExists: true} : null))
        )
      }

    };
  }

  phoneValidator() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.valueChanges || control.pristine) {
        return of(null);
      }
      else {
        return this.userService.phoneExists(`+${this.countryCode}${control.value}`).pipe(
          distinctUntilChanged(),
          debounceTime(600),
          map((res: ApiResponse<any>) => (res.data.Response == true ? {phoneExists: true} : null))
        )
      }
    };
}

  clubValidator() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.valueChanges || control.pristine) {
        return of(null);
      }
      else {
        return this.userService.creatorExists(control.value).pipe(
          distinctUntilChanged(),
          debounceTime(600),
          map((res: ApiResponse<any>) => (res.data.Response == true ? {clubNameExists: true} : null))
        )
      }
    };
  }

  iniitCreatorForm() {
    const emailRegex = new RegExp( '^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    this.creatorForm = this.fb.group({
      email: [
        this.defaultUser.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(emailRegex)
        ]),
        this.emailValidator()
      ],
      pass: [
        this.defaultUser.pass,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
        ]),
      ],
      confirmpass: [
        this.defaultUser.pass,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
        ]),
      ],
      username: [
        this.defaultUser.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15)
        ]),


      ],
      name: [
        this.defaultUser.creatorDisplayName,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16)
        ]),
        [this.clubValidator()]
      ],
      phone: [
        this.defaultUser.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.minLength(10)
        ]),
        // [this.phoneValidator()]
      ],
      profileImg: [
        ''
      ],
      profileImage: [
        ''
      ],
    },{
      validator: ConfirmedValidator('pass', 'confirmpass')
    })
  }

  openNav(){
    this.menu.nativeElement.style.width = "100%";
  }

  closeNav(){
  this.menu.nativeElement.style.width = "0%"
  }




  ngAfterViewInit() {
    // debugger
  }

  passwordShowHide(): void {
    this.passwordHide = !this.passwordHide;
  }

 async signup() {
   await this.fireAuth.signup(this.fullname, this.email, this.password);
  }

  next() {
    this.myStepper.next();
  }

  async sign() {
    this.connService.sendUserCredentials({
      email: this.email,
      pass: this.password
    })
  }

  becomeCreator() {
    this.showLoading = true;
    const mediaUpload:any = [];
    if(this.profileImageSrc){
      debugger
      mediaUpload.push(this.mediaService.uploadMedia('creator', this.profileImg));
    }
    combineLatest(mediaUpload)
    .pipe(take(1),
    exhaustMap((res: ApiResponse<ResponseAddMedia>) => {
      if(!res[0].hasErrors()) {
        debugger
        const param: BecomeCreator = {
          creatorDisplayName: this.creatorForm.value.name,
          // appPackageId: (this.creatorForm.controls.name.value).toLowerCase().replace(/\s/g,''),
          appPackageId: this.creatorForm.value.email,
          creatorProfileImageURL: res[0].data.url,
          isWithoutApp: true,
          name: this.creatorForm.value.username,
          pass: this.creatorForm.value.pass,
          email: this.creatorForm.value.email,
          phoneNumber: `+${this.countryCode}${this.creatorForm.value.phone}`,
          clubName: this.creatorForm.value.name,
        };
        if (res[0] && res[1] && !res[1].hasErrors()) {
          param.creatorProfileImageURL = res[1].data.url
        }

        return this.userService.becomeCreator(param).pipe(map((res:ApiResponse<any>) => {
          if(!res.hasErrors()) {
            this.openNav()
            setTimeout(() => {
              this.route.navigate(['/', this.creatorForm.value.name]);
               this.sign().then(() => {

                  this.login();
                this.closeNav();
              })
              .catch((err) => {
                if(err) {
                  this.toastr.error('Failed')
                  return
                }
              })
            }, 5000)

            this.showLoading = false;
          }
            else {
            this.toastr.error('Failed To Create New User', 'Create User');
            this.showLoading = false;
            return
          }
        }))

        // return this.signup().then(() => {

        // })
        // .catch((error)=> {
        //   this.toastr.error(error, 'Something went wrong')
        //   console.log(error)
        //   this.showLoading = false;
        //   return;
        // })

        // this.userService.becomeCreator(param)
        // .pipe(takeUntil(this.destroy$))
        // .subscribe((res: ApiResponse<BecomeCreator>) => {

        //   if(!res.hasErrors()) {
        //     this.openNav()
        //     setTimeout(() => {
        //       this.route.navigate(['/', this.creatorForm.value.name]);
        //        this.sign().then(() => {

        //           this.login();
        //         this.closeNav();
        //       })
        //       .catch((err) => {
        //         if(err) {
        //           this.toastr.error('Failed')
        //           return
        //         }
        //       })
        //     }, 5000)

        //     this.showLoading = false;
        //   }

        //   else {
        //     this.toastr.error('Failed To Create New User', 'Create User');
        //     this.showLoading = false;
        //     return
        //   }
        // })
      }

      else {
        this.showLoading = false;
        return of(res);
      }
    }),
    )
    .subscribe()
      // (res:any) => {
    //   debugger
    //   console.log(res)
    //   if (res !== null && !res.hasErrors()) {
    //     this.showLoading = false;
    //   } else {
    //     this.toastr.error(res.errors[0]?.error?.message, 'Error!')
    //     return (res)
    //    }
    // })

  }

  login():void {
    setTimeout(() => {
      this.customDialogService.showUserSignInDialog(false,'market-page');
    }, 2000);
  }


  getOTP() {
    this.showPhoneLoading = true;
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier
    ('sign-in-button',
    {size: 'invisible'},)
    // this.timer(1);
    debugger
    this.payload = {
      phoneNumber: `+${this.countryCode}${this.creatorForm.value.phone}`
    }
    firebase
    .auth()
    .signInWithPhoneNumber(this.payload, this.reCaptchaVerifier)
    .then((res)=> {
      console.log(res);
      localStorage.setItem('verificationId', JSON.stringify(res.verificationId))
      // debugger
      this.myStepper.next();
      this.cf.detectChanges();
      this.showPhoneLoading = false;
      this.toastr.success('We have sent an otp. Please fill in the below fields to continue.', 'Verify')
    }).catch((error)=> {
      this.toastr.error(error.message)
       setTimeout(() => {
        window.location.reload()
      },2000);
    })
  }


  resend() {
  this.getOTP()
  }

  handleClick() {
    debugger
    this.showVerifyOtp = true;
    debugger
    const otp = this.otp.replace(/\s/g,'');
    const credentials = firebase.auth.PhoneAuthProvider.credential(this.verify, otp);
    debugger
    firebase
    .auth()
    .signInWithCredential(credentials)
    // .catch((error) => {
    //   if (error.code === 'Invalid') {
    //     firebase.auth().signInWithCredential(credentials)
    //   }
    // })
    .then((res)=> {
      this.toastr.success('Your phone number is verified.', 'Success!')
      this.myStepper.next();
      this.showVerifyOtp = false;
      localStorage.setItem('user_data',JSON.stringify(res))
    })
    .catch((error) => {
      debugger
      if (error) {
            firebase.auth().signInWithCredential(credentials)
            this.myStepper.next();
         }

    })
    // .then((res) => {
    //   console.log(res)
    //   this.toastr.success('Your phone number is verified.', 'Success!')
    //   this.myStepper.next();
    //   this.showVerifyOtp = false;
    //   localStorage.setItem('user_data',JSON.stringify(res))
    // }).catch((error) => {
    //   this.toastr.error(error.message)
    //   console.log(error.message)
    //   // setTimeout(() => {
    //   //   window.location.reload()
    //   // }, 1000);
    //   // this.myStepper.previous();
    // })
  }

  onOtpChange(otpCode: any) {
    debugger
    this.cf.detectChanges();
    this.otp = otpCode
    // console.log(this.otp)
  }





  onCountryChange(country) {
    // debugger
    this.countryCode = country.dialCode
  }

  telInputObject(obj) {
    console.log(obj);
    obj.setCountry('bg');
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  onSelectProfile(event): void {
    debugger
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
    this.creatorForm.controls.creatorProfileImageURL.setValue(null);
    this.imgFile.nativeElement.value = '';
  }

  editImg():void {
    this.profileImg.delete('file');
    this.cropProfileImg(this.creatorForm.controls.profileImage?.value);
  }


  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }





}
