/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseAddGroupMedia } from '@app/@core/models/response-add-media.model';
import { MediaService } from '@app/@core/services/media.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import * as htmlToImage from 'html-to-image';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
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

  public groupForm: FormGroup;
  public imgFormData = new FormData();

  constructor(
    private authService: AuthService,
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private mediaService: MediaService,
    protected http: HttpClient,
    private toastr: ToastrService,
    private cf: ChangeDetectorRef
  ) {
    this.groupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]),
      description: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(100) ]),
      file: new FormControl(''),
    });
  }

  addGroup():void {
    console.log('this.:',this.groupForm);
    return;
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
            if (res !== null) {
              this.cf.detectChanges();
              this.close();
              this.toastr.success('New group successfully added.', 'Success!');

            } else {
              this.toastr.warning(res.errors[0]?.error?.message, 'Error!');
              // alert('error :' + res.errors[0]?.error?.message);
            }
          });
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });

  }

  close():void {
    this.customDialogService.closeDialogs();
  }
}
