/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, Validators
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
import { environment } from '@environments/environment';
// firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, of, Subject } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
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
  apiKey: "AIzaSyB6QLWR3WOdWHO8509Oz80i0s8NmaADxAg",
  authDomain: "noderon-b855c.firebaseapp.com",
  databaseURL: "https://noderon-b855c-default-rtdb.firebaseio.com",
  projectId: "noderon-b855c",
  storageBucket: "noderon-b855c.appspot.com",
  messagingSenderId: "350246945413",
  appId: "1:350246945413:web:41553760aab149ff231fec",
  measurementId: "G-KJQER735Z2"
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
    private cf: ChangeDetectorRef,
    public fireAuth: FireAuthService,
    private customDialogService: CustomDialogService,
    private mediaService: MediaService,
    private creatorService: CreatorService,
    private userService: UserService,
    private connService : ConnService,
    private route: Router) {
      this.creatorForm = this._formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        profileImg: new FormControl(''),
        profileImage: new FormControl(''),
      });

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

     this.UserForm = this._formBuilder.group( {
      fullname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    // { validators: passwordsMatchValidator() }
    )

    firebase.initializeApp(environment.firebase)
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}')

  }

  openNav(){
    this.menu.nativeElement.style.width = "100%";
  }

  closeNav(){
  this.menu.nativeElement.style.width = "0%"
  }




  ngAfterViewInit() {
    // debugger
    // if(localStorage.getItem('display_name' && 'appPackageId')) {
    //  this.myStepper.selectedIndex = 2
    // }

  }

  // timer(minute) {
  //   let minute = 1;
  //   let seconds: number = minute * 60;
  //   let textSec: any = "0";
  //   let statSec: number = 60;

  //   const prefix = minute < 10 ? "0" : "";

  //   const timer = setInterval(() => {
  //     seconds--;
  //     if (statSec != 0) statSec--;
  //     else statSec = 59;

  //     if (statSec < 10) {
  //       textSec = "0" + statSec;
  //     } else textSec = statSec;

  //     this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

  //     if (seconds == 0) {
  //       console.log("finished");
  //       clearInterval(timer);
  //     }
  //   }, 1000);
  // }

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
      mediaUpload.push(this.mediaService.uploadMedia('creator', this.profileImg));
    }
    combineLatest(mediaUpload)
    .pipe(take(1),
    exhaustMap((res: ApiResponse<ResponseAddMedia>) => {
      if(!res[0].hasErrors()) {
        const param: BecomeCreator = {
          creatorDisplayName: this.creatorForm.controls.name.value,
          // appPackageId: (this.creatorForm.controls.name.value).toLowerCase().replace(/\s/g,''),
          appPackageId: this.email,
          creatorProfileImageURL: res[0].data.url,
          isWithoutApp: true,
          name: this.fullname,
          pass: this.password,
          email: this.email,
          phoneNumber: `+${this.countryCode}`+this.phoneNumber,
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
      phoneNumber: `+${this.countryCode}`+this.phoneNumber
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
    this.profileImg.delete('file');
    this.cropProfileImg(this.creatorForm.controls.profileImage?.value);
  }


  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }





}
