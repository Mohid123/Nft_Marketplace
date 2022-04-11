/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  file: any;
  multiples: any[] = [];
  urls: any[] = [];
  countryCode: number;
  otp!: string;

  phoneNumber: number





  constructor( private _formBuilder: FormBuilder,
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
  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  onCountryChange(country) {
    this.countryCode = country.dialCode
  }

  onOtpChange(otpCode: any) {
    this.otp = otpCode
    console.log(this.otp)
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
