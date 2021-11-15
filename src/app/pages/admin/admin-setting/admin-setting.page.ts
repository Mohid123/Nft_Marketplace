/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.page.html',
  styleUrls: ['./admin-setting.page.scss']
})
export class AdminSettingPage implements OnInit {
  public settingForm: FormGroup;
  public file: any;
  public imageSrc: any;
  constructor(  private formBuilder: FormBuilder) {

    this.settingForm = this.formBuilder.group({
      description: new FormControl('', [Validators.required]),
      key: new FormControl('', [Validators.required, Validators.minLength(3)]),
      // mint: [false, Validators.requiredTrue],
      // sale: [false, Validators.requiredTrue],


    });
  }

  ngOnInit(): void {
  }

  saveSetting(){
    console.log(this.settingForm)
  }

  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageSrc = e.target.result;

          // this.createNft.patchValue({
          //   img: this.imageSrc,
          // });
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

}
