/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatorService } from '@app/@core/services/creator.service';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.page.html',
  styleUrls: ['./admin-setting.page.scss']
})
export class AdminSettingPage implements OnInit {

  public creator$ = this.creatorService.Creator$;

  public settingForm: FormGroup;
  public profileImage: any;
  public profileImageSrc: any;
  public coverImage: any;
  public coverImageSrc: any;

  constructor(
    private creatorService: CreatorService,
    private formBuilder: FormBuilder,
  ) {
    this.settingForm = this.formBuilder.group({
      description: new FormControl('', [Validators.required]),
      key: new FormControl('', [Validators.required, Validators.minLength(3)]),
      // mint: [false, Validators.requiredTrue],
      // sale: [false, Validators.requiredTrue],


    });
  }

  ngOnInit(): void {
  }

  saveSetting():void {
    console.log(this.settingForm)
  }

  onSelectProfile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.profileImage = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.profileImageSrc = e.target.result;

          // this.createNft.patchValue({
          //   img: this.imageSrc,
          // });
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }
  onSelectCover(event): void {
    if (event.target.files && event.target.files[0]) {
      this.coverImage = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.coverImageSrc = e.target.result;

          // this.createNft.patchValue({
          //   img: this.imageSrc,
          // });
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

}
