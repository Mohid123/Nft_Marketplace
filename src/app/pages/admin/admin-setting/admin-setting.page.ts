/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { CreatorService } from '@app/@core/services/creator.service';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { RouteService } from '@app/@core/services/route.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Creator } from './../../../@core/models/creator.model';
import { AddStripeKey } from './../../../@core/models/requests/add-stripe-key.model';
import { ResponseAddMedia } from './../../../@core/models/response-add-media.model';
import { ResponseStripeStatus } from './../../../@core/models/response-add-stripe-key.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { MediaService } from './../../../@core/services/media.service';
import { StripeService } from './../../../@core/services/stripe.service';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.page.html',
  styleUrls: ['./admin-setting.page.scss'],
})
export class AdminSettingPage implements OnInit, OnDestroy {
  @ViewChild('profileFile') profileFile;
  @ViewChild('coverFile') coverFile;

  public destroy$ = new Subject();
  public creator$ = this.creatorService.Creator$;

  public settingForm: FormGroup;
  public profileImage: any;
  public profileImg = new FormData();
  public profileImageSrc: any;
  public coverImage: any;
  public coverImg = new FormData();
  public coverImageSrc: any;

  public isLoading: boolean;
  description: any;

  public creator: Creator;

  constructor(
    private creatorService: CreatorService,
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
    private routeService: RouteService,
    private stripeService: StripeService,
    private toastr: ToastrService,
    private mediaService: MediaService,
  ) {
    this.isLoading = false;
    this.settingForm = this.formBuilder.group({
      description: new FormControl('', [Validators.required]),
      key: new FormControl(''),
      profileImage: new FormControl(''),
      coverImage: new FormControl(''),
      profileImg: new FormControl(''),
      coverImg: new FormControl(''),
    });

    this.creator$.subscribe((creator) => {
      this.creator = creator;
      this.settingForm.controls.key.setValue(this.creator.stripeSecretKey);
      this.settingForm.controls.description.setValue(this.creator.description);
      this.description = this.creator.description;
    });
  }

  ngOnInit(): void {}

  saveSetting(): void {
    this.isLoading = true;
    if (
      this.settingForm.controls?.key?.value.length > 0 &&
      this.creator.stripeSecretKey !== this.settingForm.controls?.key?.value
    ) {
      this.updateKey();
    } else if (this.profileImage) {
      this.updateProfilePic();
    } else if (this.coverImage) {
      this.updateCoverPic();
    } else {
      this.saveChagesToServer();
    }
  }

  updateKey(): void {
    const params: AddStripeKey = {
      key: this.settingForm.controls.key.value,
      clubName: this.routeService.clubName,
    };

    this.stripeService
      .addKey(params)
      .subscribe((result: ApiResponse<ResponseStripeStatus>) => {
        if (!result.hasErrors() && result.data.isValid) {
          this.creator.stripeSecretKey = params.key;
          if (this.profileImage) {
            this.updateProfilePic();
          } else if (this.coverImage) {
            this.updateCoverPic();
          } else {
            this.saveChagesToServer();
          }
        } else {
          this.isLoading = false;
          this.toastr.warning('Please enter valid stripe key.', 'Invalid!');
        }
      });
  }

  updateProfilePic(): void {
    this.mediaService
      .uploadMedia('nft', this.profileImg)
      .pipe(take(1))
      .subscribe((res: ApiResponse<ResponseAddMedia>) => {
        if (!res.hasErrors()) {
          this.creator.profileImageURL = res.data.url;
          if (this.coverImage) {
            this.updateCoverPic();
          } else {
            this.saveChagesToServer();
          }
        } else {
          this.isLoading = false;
          this.toastr.error(res.errors);
        }
      });
  }

  updateCoverPic(): void {
    this.mediaService
      .uploadMedia('creatorCover', this.coverImg)
      .pipe(take(1))
      .subscribe((res: ApiResponse<ResponseAddMedia>) => {
        if (!res.hasErrors()) {
          this.creator.coverImageURL = res.data.url;
          this.saveChagesToServer();
        } else {
          this.isLoading = false;
          this.toastr.error(res.errors);
        }
      });
  }

  saveChagesToServer(): void {
    if (this.settingForm.controls?.description?.value?.length > 0) {
      this.creator.description = this.settingForm.controls?.description?.value;
    }

    this.creatorService
      .updateCreator(this.routeService.clubName, this.creator)
      .subscribe((res: ApiResponse<Creator>) => {
        this.isLoading = false;
        this.settingForm.reset();
        if (!res.hasErrors()) {
          this.toastr.success('Profile update successfully');
        }
      });
  }

  onSelectProfile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.profileImage = event.target.files[0];
      this.settingForm.controls?.profileImg.setValue(this.profileImage.name);
      this.profileImg.append('file', this.settingForm.get('profileImg').value);
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // console.log('img ccrop:',);
          this.cropProfileImg(event);
          // this.customDialogService.showImageCropperDialog(event, 1 / 1,true).then(matRef => {
          //   matRef.afterClosed().subscribe((result) => {
          //     // console.log('showImageCropperDialog:',result);
          //     if(result)
          //       this.profileImageSrc = result;
          //     else {
          //       this.profileImageSrc = null;
          //       this.profileImage = null;
          //       this.settingForm.controls.profileImg.setValue(null);
          //       this.profileFile.nativeElement.value = "";
          //     }
          //   });
          // })
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  onSelectCover(event): void {
    if (event.target.files && event.target.files[0]) {
      this.coverImage = event.target.files[0];
      this.settingForm.controls?.coverImg.setValue(this.coverImage.name);
      this.coverImg.append('file', this.settingForm.get('coverImg').value);
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.cropCoverImg(event);
          // this.customDialogService.showImageCropperDialog(event, 3.88 / 1,true).then(matRef => {
          //   matRef.afterClosed().subscribe((result) => {
          //     // console.log('showImageCropperDialog:',result);
          //     if(result)
          //       this.coverImageSrc = result;
          //       else {
          //         this.coverImageSrc = null;
          //         this.coverImage = null;
          //         this.settingForm.controls.coverImg.setValue(null);
          //         this.coverFile.nativeElement.value = "";
          //       }
          //   });
          // })
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  cropProfileImg(event): void {
    this.settingForm.controls.profileImage?.setValue(event);
    this.customDialogService
      .showImageCropperDialog(event, 1 / 1, true)
      .then((matRef) => {
        matRef.afterClosed().subscribe((result) => {
          // console.log('showImageCropperDialog:',result);
          if (result) {
            this.profileImageSrc = result;
            this.settingForm.patchValue({
              profileImg: this.profileImageSrc,
            });
          } else {
            this.profileImageSrc = null;
            this.profileImage = null;
            this.settingForm.controls.profileImg?.setValue(null);
            this.profileFile.nativeElement.value = '';
          }
        });
      });
  }

  cropCoverImg(event): void {
    this.settingForm.controls.coverImage?.setValue(event);
    this.customDialogService
      .showImageCropperDialog(event, 3.88 / 1, true)
      .then((matRef) => {
        matRef.afterClosed().subscribe((result) => {
          // console.log('showImageCropperDialog:',result);
          if (result) {
            this.coverImageSrc = result;
            this.settingForm.patchValue({
              coverImg: this.coverImageSrc,
            });
          }
           else {
            this.coverImageSrc = null;
            this.coverImage = null;
            this.settingForm.controls.coverImg.setValue(null);
            this.coverFile.nativeElement.value = '';
          }
        });
      });
  }

  editProfileImg(): void {
    this.cropProfileImg(this.settingForm.controls.profileImage?.value);
  }
  editCoverImg(): void {
    this.cropCoverImg(this.settingForm.controls.coverImage?.value);
  }
}
