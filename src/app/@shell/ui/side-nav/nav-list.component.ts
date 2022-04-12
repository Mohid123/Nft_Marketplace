/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Creator } from '@app/@core/models/creator.model';
import { ApiResponse } from '@app/@core/models/response.model';
import { CreatorService } from '@app/@core/services/creator.service';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { MediaService } from '@app/@core/services/media.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
// firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, of } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { ResponseAddMedia } from './../../../@core/models/response-add-media.model';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

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
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {


  @ViewChild('imgFile') imgFile;
  @ViewChild('stepper') private myStepper: MatStepper;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  creatorForm: FormGroup;
  test: FormGroup;

  countryCode: number;
  otp!: string;
  verify: any;

  phoneNumber: any;
  reCaptchaVerifier: any;
  payload: any

  public groupFile: any;
  public imageSrc: any;
  public groupimgFormData = new FormData();
  signUpForm = new FormGroup(
    {
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );



  constructor( private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cf: ChangeDetectorRef,
    private authService: AuthService,
    private customDialogService: CustomDialogService,
    private mediaService: MediaService,
    private creatorService: CreatorService,
    private route: Router) {
      this.creatorForm = this._formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]),
        groupFile: new FormControl(''),
        fileName: new FormControl(''),
        img: new FormControl(''),
      });
    }
    config = {
      allowNumbersOnly: true,
      length: 6,
      isPasswordInput: false,
      disableAutoFocus: false,
      placeholder: '',
      inputStyles: {
        width: '50px',
        height: '50px',
      }
    }
  ngOnInit() {

    firebase.initializeApp(fireConfig)
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}')
    console.log(this.verify)
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });




  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get fullname() {
    return this.signUpForm.get('fullname');
  }

  // submit() {
  //   debugger
  //   if(!this.signUpForm.valid) return
  //   const { name, email, password} = this.signUpForm.value;
  //   this.authService.signUp(name, email, password).pipe()
  //   .subscribe((res)=>{
  //     console.log(res)
  //   })
  // }

  getOTP() {

    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier
    ('sign-in-button', {size: 'invisible'})
    if (!this.countryCode || !this.phoneNumber) {
      this.toastr.error('Please enter valid login details(registered phone number) to continue.', 'Invalid!')
      return
    }

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
    }).catch((error)=> {
      this.toastr.error(error.message)
      setTimeout(() => {
        window.location.reload()
      }, 5000);
    })
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
    debugger
    if (event.target.files && event.target.files[0]) {
      this.groupFile = event.target.files[0];
      this.creatorForm.controls?.fileName.setValue(this.groupFile.name);

      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.cropImg(event)
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  cropImg(event) :void {
    this.creatorForm.controls.groupFile.setValue(event);
    this.customDialogService.showImageCropperDialog(event, 1.13 / 1,true).then(matRef => {
      matRef.afterClosed().subscribe((result) => {
        // console.log('showImageCropperDialog:',result);
        if (result) {
          this.imageSrc = result;
          this.creatorForm.patchValue({
            img: this.imageSrc,
          });
        } else {
          this.imageSrc = null;
          this.groupFile = null;
          this.creatorForm.controls.img.setValue(null);
          this.imgFile.nativeElement.value = "";
        }
      });
    })
  }

  editImg():void {
    this.cropImg(this.creatorForm.controls.groupFile.value);
  }


  addCreator() {
    debugger
    this.creatorForm.patchValue({
      groupFile: this.groupFile
    });
    this.groupimgFormData.append('file', this.creatorForm.get('groupFile').value);

    const mediaUpload:any = [];
    if(this.imageSrc){
      mediaUpload.push(this.mediaService.uploadMedia('creator', this.groupimgFormData));
    }

    combineLatest(mediaUpload)
    .pipe(take(1),
    exhaustMap((res: ApiResponse<ResponseAddMedia>) => {
      if(!res[0].hasErrors()) {
        debugger
        const param: Creator = {
          displayName: this.creatorForm.controls.name.value,

          // description: this.groupForm.controls.description.value,
          // appPackageId: this.authService.loggedInUser?.appPackageId,
          profileImageURL: res[0].data.url,
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
        this.toastr.success('New creator successfully added.', 'Success!');
        // this.getGroup()
        // this.close();
      } else {
        // this.imgFormData = new FormData();
        this.toastr.error(res.errors[0]?.error?.message, 'Error!');
        // alert('error :' + res.errors[0]?.error?.message);
      }
    })

  }


}
