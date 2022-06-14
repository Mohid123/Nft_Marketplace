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
import { IsMembershipIdExists } from './../../../../@core/models/is-membership-id-exists.model';
import { ApiResponse } from './../../../../@core/models/response.model';

@Component({
  selector: 'app-create-membership',
  templateUrl: './create-membership.component.html',
  styleUrls: ['./create-membership.component.scss'],
})
export class CreateMembershipComponent implements OnInit, AfterViewInit {

  @ViewChild('imgFile') imgFile;
  public group: Group;

  public imageSrc: any;
  public createNft: FormGroup;
  public imgFormData = new FormData();
  type: any;
  email: any;
  date: any;
  selectedValue: any;
  public file: any;
  public format: string;
  public url: string;
  public currentDate = new Date().toISOString().split("T")[0];

  public clubName: string;
  public limit = 100;

  private _page: number;
  private _isLoading: boolean;
  private _lastBgImg: string;
  public isLoading = false;



  public groupsByClub: ResponseGroupsByClub;
  public groups$ = this.groupService.groups$;

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
    private toastr: ToastrService,
  ) {

    // this.currentDate.getDate();

    this.createNft = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(600)]),
      file: new FormControl(''),
      fileName: new FormControl(''),
      img: new FormControl(''),
      bgImg: new FormControl(''),
      date: ['', [Validators.required]],
      membershipId: new FormControl('', [Validators.required, Validators.min(1000000000000000),Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      group: [null, [Validators.required]]
    });

    this.routeService.clubName$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((clubName) => {
        this.clubName = clubName;
      });

    if(this.nftService.createNftForm){
      this.createNft = this.nftService.createNftForm;
      this.imageSrc = this.nftService?.createNftForm?.controls?.img?.value;
      this._lastBgImg = this.createNft.controls?.bgImg?.value;
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
    this.setBackground(this._lastBgImg);
  }

  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.createNft.controls?.fileName.setValue(this.file.name);

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

  editImg():void {
    this.cropImg(this.createNft.controls.file.value);
  }

  nextClick(): void {
    this.isLoading = true;
    const params = {
      appPackageId: this.authService.loggedInUser.appPackageId,
      membershipId: this.createNft.controls.membershipId.value,
    };

    this.nftService.isMembershipIDExists(params).subscribe((result:ApiResponse<IsMembershipIdExists>)=> {
      if(!result.hasErrors() && result.data.response  == false ) {
        this.createPreviewImg().then((dataUrl) => {
          // const img = new Image();
          // img.src = dataUrl;
          // document.getElementById('view-img').appendChild(img);
          this.createNft.patchValue({
            file: this.mediaService.dataURLtoFile(
              dataUrl,
              this.createNft.controls.membershipId.value + '.png',
            ),
          });
          this.imgFormData.append('file', this.createNft.get('file').value);

          const form: NFT = {
            type : 'Membership Card',
            forSale: true,
            freezeNft:true,
            serverCaptureFileUrl:'',
            name : this.createNft.controls.name.value,
            description : this.createNft.controls.description.value,
            groupId: this.createNft.controls.group.value.id,
            userId: this.authService.loggedInUser.id,
            clubUserId: this.authService.loggedInUser.clubUserId,
            appPackageId: this.authService.loggedInUser.appPackageId,
            membershipId:  this.createNft.controls.membershipId.value,
            mediaType: 'Image'
          }
          this.nftService.createNFT = form;
          this.nftService.createNFTImg = this.imgFormData;
          this.customDialogService.showCreateNFTMembershipOptionsDialog();
        })
        .catch((error) => {
          console.error('oops, something went wrong!', error);
          this.isLoading = false;
        });
      } else {
        this.toastr.error('Membership id already exists!','Create NFT Membership')
        this.isLoading = false;
      }
    })
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
  setBackground(src?) {
    const select = <HTMLImageElement>document.querySelector('#bg-image')
    const tick = <HTMLImageElement>document.querySelector('#showImage');


     tick.src = src || (event.target as HTMLImageElement).src || '../../../../../assets/card/membership 1a.svg';
    this.createNft.patchValue({
      bgImg: tick.src,
    });
    // select.style.background = 'block';
  }

  preview(): void {
    this.createPreviewImg().then((dataUrl) => {
      this.nftService.createNftForm = this.createNft;
      this.customDialogService.showCreateNFTticketPreviewDialog(dataUrl,false, true);
    });
  }


}
