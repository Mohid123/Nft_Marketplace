import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Group } from '@app/@core/models/group.model';
import { NFT } from '@app/@core/models/NFT.model';
import { ResponseAddGroupMedia } from '@app/@core/models/response-add-media.model';
import { ResponseGroupsByClub } from '@app/@core/models/response-groups-by-club.model';
import { ApiResponse } from '@app/@core/models/response.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { GroupService } from '@app/@core/services/group.service';
import { MediaService } from '@app/@core/services/media.service';
import { NFTService } from '@app/@core/services/nft.service';
import { RouteService } from '@app/@core/services/route.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import * as htmlToImage from 'html-to-image';
import { of, Subject } from 'rxjs';
import { distinctUntilChanged, exhaustMap, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-nft',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.scss'],
})
export class CreateNFTComponent {
  group: Group

  public createNft: FormGroup;
  public imgFormData = new FormData();
  type: any;
  email: any;
  date: any;
  selectedValue: any;
  public file: any;
  public format: string;
  public url: string;


  public clubName: string;
  public limit = 6 ;


  private _page:number;
  private _isLoading:boolean;
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
    private authService: AuthService
  ) {
    // this.createNft = this.formBuilder.group({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(6),
    //   ]),
    // });
    this.createNft = this.formBuilder.group({
      file: new FormControl(''),
      date: new FormControl(''),
      address: new FormControl(''),
      selectedValue: new FormControl(''),
      type: this.nftService.createNft.type
    });


    this.routeService.clubName$.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
    .subscribe((clubName) => {
      this.clubName = clubName;
    });;


    // this.passwordHide= true;
  }

  ngOnInit(): void {
    if (this._isLoading) return
    this.groupService.getAllGroupsByClub(this.clubName, this._page++, this.limit);
  }

  onSelectFile(event): void {
    this.file = event.target.files && event.target.files[0];
    console.log(this.file)
    if (this.file) {
    const reader = new FileReader();
      reader.readAsDataURL(this.file);
      if (this.file.type.indexOf('image') > -1) {
        this.format = 'image';

      }
      // else if (this.file.type.indexOf('video') > -1) {
      //   this.format = 'video';
      // }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result as string;
        this.cf.detectChanges();
      }
      event.target.value = '';
      this.createNft.patchValue( {
        file : this.file
      })
      this.addNft();
    }
  }

  // addMedia() {
  //   this.mediaUpload.post
  // }

  nextClick():void{
    this.nftService.createNft = new NFT();


    this.nftService.createNft.serverCaptureFileUrl = this.file;
    this.nftService.createNft.createdAt = this.date;
    this.nftService.createNft.groupId = this.selectedValue;
    this.nftService.createNft.type = this.type;



  this.customDialogService.showCreateNFTStyleDialog();
  // this.nftService.addNft(this.nftService.createNft).pipe(take(1)).subscribe(res=> {
  //   console.log('res:',res);
  // });
}

addNft() : void{

       // Create form data
       const formData = new FormData();
       formData.append('file', this.createNft.get('file').value);
       console.log('form data:',formData);

  // this.nftService.upload('nft-img',formData);
  console.log('img:',this.file);
  // this.nftService.uploadImage('Logo', this.file ).then((data)=>{
  //   console.log('uploaded')
  // })
}
  close(): void {
    this.customDialogService.closeDialogs();
  }

  addImage() : void {
    const node = document.getElementById('bg-image');
    htmlToImage
      .toPng(node, {
        canvasWidth: 529,
        canvasHeight: 487,
        width: 529,
        height: 487,
        quality: 1,
        pixelRatio: 1,
        skipAutoScale: false,
        // style: {
        //   display: 'block',
        //   transform: 'rotate(41.3deg)',
        // }
      })
      .then((dataUrl) => {
        this.createNft.patchValue({
          file: this.mediaService.dataURLtoFile(
            dataUrl,
            this.createNft.controls.date.value + '.png',
          ),
        });
        this.imgFormData.append('file', this.createNft.get('file').value);
        this.mediaService.uploadMedia('group', this.imgFormData).pipe(take(1),
            exhaustMap((res: ApiResponse<ResponseAddGroupMedia>) => {
              if(!res.hasErrors()) {
                const param: NFT = {
                  type: this.nftService.createNft.type,
                  createdAt: this.createNft.controls.date.value,
                  groupId: this.createNft.controls.selectedValue.value,
                  appPackageId: this.authService.loggedInUser?.appPackageId,
                  serverCaptureFileUrl: res.data.url,
                };
                return this.nftService.addNft(param);
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

  // Click on each image and display each individually on background div
  showImageInDiv() : void {
    const select = <HTMLImageElement>document.querySelector('#bg-image');
    const tick = <HTMLImageElement>document.querySelector('#showImage');
    Array.from(document.querySelectorAll('#ticket')).forEach(image => {
      image.addEventListener('click', event => {
        select.style.display = 'block';
        tick.src = (event.target as HTMLImageElement).src;
      })
    })
  }

}
