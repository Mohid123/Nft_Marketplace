/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
// firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ToastrService } from 'ngx-toastr';

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
  @ViewChild('stepper') private myStepper: MatStepper;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  file: any;
  multiples: any[] = [];
  urls: any[] = [];
  countryCode: number;
  otp!: string;
  verify: any;

  phoneNumber: any;
  reCaptchaVerifier: any;
  payload: any





  constructor( private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cf: ChangeDetectorRef) { }
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
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

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



  onSelectFile(event: any) {
    this.file = event.target.files && event.target.files.length;
    if (this.file > 0 && this.file < 11) {let i = 0;
      for (const singlefile of event.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(singlefile);
        this.urls.push(singlefile);
        this.cf.detectChanges();
        i++;
        reader.onload = (event) => {
          const url = (<FileReader>event.target).result as string;
          this.multiples.push(url);
          this.cf.detectChanges();
          // If multple events are fired by user
          if (this.multiples.length > 10) {
            // If multple events are fired by user
            this.multiples.pop();
            this.urls.pop();
            window.alert('Maximum number of files reached') //temporary alert. will replace with toast
          }
        };
      }
    }
    else {
      window.alert('Please Select upto 10 files')
    }
  }

}
