/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseAddGroupMedia } from '@app/@core/models/response-add-media.model';
import { MediaService } from '@app/@core/services/media.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import * as htmlToImage from 'html-to-image';
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
  ) {
    this.groupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
      file: new FormControl(''),
    });
  }

  addGroup():void {
    const node = document.getElementById('group-img');
    htmlToImage
      .toPng(node, {
        canvasWidth: 150,
        canvasHeight: 136,
        width: 150,
        height: 136,
        quality: 1,
        pixelRatio: 1,
        skipAutoScale: false,
        style: {
          display: 'block',
          transform: 'rotate(41.3deg)',
        }
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
              this.close();
            } else {
              alert('error :' + res.errors[0]?.error?.message);
            }
            console.log('res:', res);
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
