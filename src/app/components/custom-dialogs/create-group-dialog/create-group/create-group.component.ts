/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseAddGroupMedia } from '@app/@core/models/response-add-media.model';
import { MediaService } from '@app/@core/services/media.service';
import { RouteService } from '@app/@core/services/route.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import * as htmlToImage from 'html-to-image';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
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
  destroy$ = new Subject();
  public groupForm: FormGroup;
  public imgFormData = new FormData();


  private _isLoading:boolean;
  public clubName: string;
  public groups$ = this.groupService.groups$;
  public limit = 6 ;
  public page:number;

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
      description: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(100) ]),
      file: new FormControl(''),
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

  addGroup():void {
    this.spinner.show('main');
    const node = document.getElementById('group-img');
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
        this.groupForm.patchValue({
          file: this.mediaService.dataURLtoFile(
            dataUrl,
            this.groupForm.controls.name.value + '.png',
          ),
        });
        this.imgFormData.append('file', this.groupForm.get('file').value);
        this.mediaService.uploadMedia('group', this.imgFormData).pipe(take(1),
            exhaustMap((res: ApiResponse<ResponseAddGroupMedia>) => {
              if(!res.hasErrors()) {
                const param: AddGroup = {
                  name: this.groupForm.controls.name.value,
                  description: this.groupForm.controls.description.value,
                  appPackageId: this.authService.loggedInUser?.appPackageId,
                  coverImageUrl: res.data.url,
                };
                return this.groupService.addGroups(param);
              } else {
                return of(null);
              }
            }),
          ).subscribe((res:any) => {
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




  close():void {
    this.customDialogService.closeDialogs();
  }
}
