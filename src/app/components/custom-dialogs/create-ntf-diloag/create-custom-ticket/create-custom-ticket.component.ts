/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Group } from '@app/@core/models/group.model';
import { NFT } from '@app/@core/models/NFT.model';
import { ResponseGroupsByClub } from '@app/@core/models/response-groups-by-club.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { GroupService } from '@app/@core/services/group.service';
import { MediaService } from '@app/@core/services/media.service';
import { NFTService } from '@app/@core/services/nft.service';
import { RouteService } from '@app/@core/services/route.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import * as htmlToImage from 'html-to-image';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-custom-ticket',
  templateUrl: './create-custom-ticket.component.html',
  styleUrls: ['./create-custom-ticket.component.scss']
})
export class CreateCustomTicketComponent implements OnInit, AfterViewInit {

  _imgFileExtensions = ["image/jpeg", "image/jpeg", "image/bmp", "image/tiff", "image/png"];
  _gifFileExtensions = ["image/gif"];
  _audioFileExtensions = ["audio/mp3","audio/wav","audio/mpeg"];
  _videoFileExtensions = ["video/m4v", "video/quicktime", "video/avi", "video/mpg", "video/mp4"];
  _validFileExtensions = [...this._imgFileExtensions,...this._gifFileExtensions,...this._videoFileExtensions, ...this._audioFileExtensions]

  @ViewChild('imgFile') imgFile;
  msg: string
  public group: Group;

  public imageSrc: any;
  public otherFileScr: any;
  public thumbnailImageSrc: any;
  public createNft: FormGroup;
  public imgFormData = new FormData();
  public thumbnailImgFormData = new FormData();
  type: any;
  email: any;
  date: any;
  selectedValue: any;
  public file: any;
  public format: string;
  public url: string;

  public clubName: string;
  public limit = 100;

  private _page: number;
  private _isLoading: boolean;
  private _lastBgImg: string;

  public groupsByClub: ResponseGroupsByClub;
  public groups$ = this.groupService.groups$;

  public isLoading = false;

  destroy$ = new Subject();

  constructor(
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
    private cf: ChangeDetectorRef,
    private mediaService: MediaService,
    private nftService: NFTService,
    private groupService: GroupService,
    private routeService: RouteService,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) {
    this.createNft = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(600)]),
      file: new FormControl(''),
      thumbnailFile: new FormControl(''),
      fileName: new FormControl(''),
      img: new FormControl(''),
      otherFile: new FormControl(''),
      thumbnailImg: new FormControl(''),
      bgImg: new FormControl(''),
      mediaType: new FormControl(''),
      date: (''),
      address: (''),
      group: [null]
    });

    this.routeService.clubName$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((clubName) => {
        this.clubName = clubName;
      });

    if (this.nftService.createNftForm) {
      this.createNft = this.nftService.createNftForm;
      this.imageSrc = this.nftService?.createNftForm?.controls?.img?.value;
      this.otherFileScr = this.nftService?.createNftForm?.controls?.otherFile?.value;
      this.thumbnailImageSrc = this.nftService?.createNftForm?.controls?.thumbnailImg?.value;
      // this._lastBgImg = this.createNft.controls?.bgImg?.value;
      this.file = { name :this.createNft.controls?.fileName?.value};
      this.nftService.createNftForm = null;
    }
  }

  ngOnInit(): void {
    if (this._isLoading) return;
    const param = {
      limit: this.limit
    }
    this.groupService.getAllGroupsByClub(
      this.clubName,
      this._page++,
      param
    );
  }

  ngAfterViewInit():void {
    // this.setBackground(this._lastBgImg);
  }

  onSelectFile(event): void {

    if (event.target.files && event.target.files[0]) {
      if (this._validFileExtensions.includes(event.target.files[0].type)) {
        this.file = event.target.files[0];
        this.createNft.controls?.fileName.setValue(this.file.name);
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          if(this._imgFileExtensions.includes(event.target.files[0].type)) {
            this.otherFileScr = null;
            this.thumbnailImageSrc = null;
            this.createNft.controls.thumbnailImg.setValue(null);
            this.createNft.controls['mediaType'].setValue('Image');
            reader.onload = (e: any) => {
              this.cropImg(event);
            };
            reader.readAsDataURL(event.target.files[0]);
          } else if(this._gifFileExtensions.includes(event.target.files[0].type)) {
            this.createNft.controls['mediaType'].setValue('Gif');
            reader.onload = (e: any) => {
              this.imageSrc = reader.result;
              this.createNft.controls.file.setValue(this.imageSrc);
              this.createNft.patchValue({ img: this.imageSrc });
              this.createNft.controls.thumbnailImg.setValue(null);
              this.thumbnailImageSrc = null;
              this.otherFileScr = null;
            };
            reader.readAsDataURL(event.target.files[0]);

          } else if(this._audioFileExtensions.includes(event.target.files[0].type)) {
            const thumbnailReader = new FileReader();
            this.createNft.controls['mediaType'].setValue('Audio');
            // reader.onload = (e: any) => {};
              reader.onload = (e: any) => {
                this.otherFileScr = reader.result;
              };
              reader.readAsDataURL(event.target.files[0]);
          } else if(this._videoFileExtensions.includes(event.target.files[0].type)) {
            const thumbnailReader = new FileReader();
            this.createNft.controls['mediaType'].setValue('Video');
            // reader.onload = (e: any) => {};
            this.mediaService.generateThumbnail(this.file, ('thumbnail-' + this.file.name)).then(img => {

              thumbnailReader.onload = e => {
                this.thumbnailImageSrc = thumbnailReader.result;
                  this.createNft.patchValue({
                    thumbnailImg: this.thumbnailImageSrc,
                  });
                  this.imageSrc = null;
                  this.createNft.controls.img.setValue(null);
              };
              thumbnailReader.readAsDataURL(img);
              reader.onload = (e: any) => {
                this.otherFileScr = reader.result;
              };
              reader.readAsDataURL(event.target.files[0]);
            })
          }
          }
      } else {
        console.log('event.target.files[0].type:',event.target.files[0].type);
        this.toastrService.error('Invalid File Format', 'Error');
      }
    }
  }

  cropImg(event) :void {
    // debugger
    this.createNft.controls.file.setValue(event);
    this.customDialogService.showImageCropperDialog(event, 1.13 / 1,true).then(matRef => {
      matRef.afterClosed().subscribe((result) => {
        // console.log('showImageCropperDialog:',result);
        if (result) {
          this.imageSrc = result;
          this.createNft.patchValue({
            img: this.imageSrc,
          });
        } else {
          this.imageSrc = null;
          this.file = null;
          this.createNft.controls.img.setValue(null);
          this.imgFile.nativeElement.value = "";
        }
      });
    })
  }

  edit(){
   console.log('edit')
  }


  nextClick(): void {
    this.isLoading = true;
    if (this._imgFileExtensions.includes(this.file.type)) {
      this.createPreviewImg().then((dataUrl) => {
         this.setFormParams(dataUrl);
         })
         .catch((error) => {
           console.error('oops, something went wrong!', error);
           this.isLoading = false;
         });
    } else {
      this.setFormParams();
    }
  }

  setFormParams(dataUrl?) {
            // const img = new Image();
        // img.src = dataUrl;
        // document.getElementById('showImage').appendChild(img);
        this.createNft.patchValue({file: dataUrl ? (this.mediaService.dataURLtoFile(dataUrl,this.createNft.controls.address.value + '.png')): this.file });
        this.imgFormData.append('file', this.createNft.get('file').value);
        if (this.thumbnailImageSrc) {

          this.createNft.patchValue({
            thumbnailFile: this.mediaService.dataURLtoFile(
              this.thumbnailImageSrc,
              'thumbnail-' + this.createNft.controls.address.value + '.png',
            ),
          });

          this.thumbnailImgFormData.append(
            'file',
            this.createNft.get('thumbnailFile').value,
          );
        }

        const form: NFT = {
          type : 'Custom',
          forSale: true,
          freezeNft:true,
          serverCaptureFileUrl:'',
          name : this.createNft.controls.name.value,
          description : this.createNft.controls.description.value,
          groupId: this.createNft.controls.group.value?.id,
          userId: this.authService.loggedInUser.id,
          clubUserId: this.authService.loggedInUser.clubUserId,
          appPackageId: this.authService.loggedInUser.appPackageId,
          mediaType: this.createNft.controls.mediaType.value,
          videoThumbnailUrl: '',
        }
        this.nftService.createNFT = form;
        this.nftService.createNFTImg = this.imgFormData;
        this.nftService.createNFTthumbnailImg = this.thumbnailImageSrc ? this.thumbnailImgFormData : null;
        this.customDialogService.showCreateNFTticketOptionsDialog();
  }

  createPreviewImg():Promise<any> {
    const node = document.getElementById('bg-image');

    return htmlToImage
      .toPng(node, {
        canvasWidth: 529,
        canvasHeight: 480,
        width: 529,
        height: 480,
        quality: 1,
        pixelRatio: 1,
        skipAutoScale: false,
        style: {
          display: 'block'
        }
      })
 }

  close(): void {
    this.customDialogService.closeDialogs();
  }

  // Click on each image and display each individually on background div
  // setBackground(src?):void {
  //   const select = <HTMLImageElement>document.querySelector('#bg-image');
  //   const tick = <HTMLImageElement>document.querySelector('#showImage');
  //   tick.src = src || (event.target as HTMLImageElement).src || '../../../../../assets/card/1A.svg';
  //   this.createNft.patchValue({
  //     bgImg: tick.src,
  //   });
  //   // select.style.display = 'block';
  // }

  preview(): void {
    if(this.createNft.controls.mediaType.value == 'Video'){
      this.nftService.createNftForm = this.createNft;
      this.customDialogService.showCreateNFTticketPreviewDialog(null,false, false, this.otherFileScr);
    } else {
      this.createPreviewImg().then((dataUrl) => {
        this.nftService.createNftForm = this.createNft;
        this.customDialogService.showCreateNFTticketPreviewDialog(dataUrl,false, false);
      });
    }
  }

  editImg():void {
    this.cropImg(this.createNft.controls.file.value);
  }

}
