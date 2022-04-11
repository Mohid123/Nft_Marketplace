/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseAddMedia } from '@app/@core/models/response-add-media.model';
import { MediaService } from '@app/@core/services/media.service';
import { RouteService } from '@app/@core/services/route.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import * as htmlToImage from 'html-to-image';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, of, Subject } from 'rxjs';
import { distinctUntilChanged, exhaustMap, take, takeUntil } from 'rxjs/operators';
import { AddGroup } from './../../../../@core/models/requests/add-group.model';
import { ApiResponse } from './../../../../@core/models/response.model';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';
import { GroupService } from './../../../../@core/services/group.service';


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {
  @ViewChild('imgFile') imgFile;
  destroy$ = new Subject();
  public groupForm: FormGroup;
  public imgFormData = new FormData();
  public groupimgFormData = new FormData();
  public groupFile: any;


  private _isLoading:boolean;
  public clubName: string;
  public groups$ = this.groupService.groups$;
  public limit = 6 ;
  public page:number;
  public imageSrc: any;

  constructor(
    private authService: AuthService,
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private mediaService: MediaService,
    protected http: HttpClient,
    private toastr: ToastrService,
    private cf: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private routeService: RouteService
  ) {
    this.groupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]),
      description: new FormControl('', [ Validators.required, Validators.minLength(15), Validators.maxLength(600) ]),
      royaltyFee: new FormControl('', [Validators.required, Validators.min(1) ,Validators.max(20)]),
      file: new FormControl(''),
      groupFile: new FormControl(''),
      fileName: new FormControl(''),
      img: new FormControl(''),
    });

    this.page = 1;
    this._isLoading = false;
    this.routeService.clubName$.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
    .subscribe((clubName) => {
      this.clubName = clubName;
      this.getGroup();
    });;
  }


  getGroup(): void {
    if (this._isLoading) return
    const param = {
      limit: this.limit
    }
    this.groupService.getAllGroupsByClub(this.clubName, this.page, param);
  }

  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.groupFile = event.target.files[0];
      this.groupForm.controls?.fileName.setValue(this.groupFile.name);

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
    // debugger
    this.groupForm.controls.groupFile.setValue(event);
    this.customDialogService.showImageCropperDialog(event, 1.13 / 1,true).then(matRef => {
      matRef.afterClosed().subscribe((result) => {
        // console.log('showImageCropperDialog:',result);
        if (result) {
          this.imageSrc = result;
          this.groupForm.patchValue({
            img: this.imageSrc,
          });
        } else {
          this.imageSrc = null;
          this.groupFile = null;
          this.groupForm.controls.img.setValue(null);
          this.imgFile.nativeElement.value = "";
        }
      });
    })
  }

  editImg():void {
    this.cropImg(this.groupForm.controls.file.value);
  }

  addGroup():void {
    this.spinner.show('main');
    const node = document.getElementById('group-img');
    debugger
    htmlToImage
      .toPng(node, {
        canvasWidth: 186,
        canvasHeight: 162,
        width: 186,
        height: 162,
        quality: 1,
        pixelRatio: 1,
        skipAutoScale: false,
        // style: {
        //   display: 'block',
        //   transform: 'rotate(41.3deg)',
        // }
      })
      .then((dataUrl) => {
        // const img = new Image();
        // img.src = dataUrl;
        // document.getElementById('group-view').appendChild(img);
        debugger
        this.groupForm.patchValue({
          file: this.mediaService.dataURLtoFile(
            dataUrl,
            this.groupForm.controls.name.value + '.png',
          ),
          groupFile: this.groupFile
        });
        this.imgFormData.append('file', this.groupForm.get('file').value);
        this.groupimgFormData.append('file', this.groupForm.get('groupFile').value);
        debugger

        const mediaUpload:any = [];
        mediaUpload.push(this.mediaService.uploadMedia('group', this.imgFormData));

        if(this.imageSrc){
          mediaUpload.push(this.mediaService.uploadMedia('group', this.groupimgFormData));
        }

        combineLatest(mediaUpload)
        .pipe(
          take(1),
          exhaustMap((res: ApiResponse<ResponseAddMedia>) => {
            debugger
            if(!res[0].hasErrors()) {
              const param: AddGroup = {
                name: this.groupForm.controls.name.value,
                royaltyFee: this.groupForm.controls.royaltyFee.value,
                description: this.groupForm.controls.description.value,
                appPackageId: this.authService.loggedInUser?.appPackageId,
                coverImageUrl: res[0].data.url,
              };

              if (res[0] && res[1] && !res[1].hasErrors()) {
                param.groupImageUrl = res[1].data.url
              }

              return this.groupService.addGroups(param);
            } else {
              return of(null);
            }
          }),
        )
        .subscribe((res:any) => {
          this.spinner.hide('main');
          if (res !== null && !res.hasErrors()) {
            this.cf.detectChanges();
            this.toastr.success('New group successfully added.', 'Success!');
            this.getGroup()
            this.close();
          } else {
            this.imgFormData = new FormData();
            this.toastr.error(res.errors[0]?.error?.message, 'Error!');
            // alert('error :' + res.errors[0]?.error?.message);
          }
        });
      })
      .catch((error) => {
        this.toastr.warning(error, 'Error!');
      });

  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }



  close():void {
    this.customDialogService.closeDialogs();
  }
}
