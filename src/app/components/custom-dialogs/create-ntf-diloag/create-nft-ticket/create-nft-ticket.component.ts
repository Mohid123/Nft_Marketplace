import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-nft-ticket',
  templateUrl: './create-nft-ticket.component.html',
  styleUrls: ['./create-nft-ticket.component.scss'],
})
export class CreateNFTticketComponent implements OnInit, AfterViewInit {

  msg: string
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

  public clubName: string;
  public limit = 100;

  private _page: number;
  private _isLoading: boolean;
  private _lastBgImg: string;

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
  ) {
    this.createNft = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(25)]),
      file: new FormControl(''),
      img: new FormControl(''),
      bgImg: new FormControl(''),
      date: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(32)]],
      group: [null, [Validators.required]]
    });

    this.routeService.clubName$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((clubName) => {
        this.clubName = clubName;
      });

    if (this.nftService.createNftForm) {
      this.createNft = this.nftService.createNftForm;
      this.imageSrc = this.nftService?.createNftForm?.controls?.img?.value;
      this._lastBgImg = this.createNft.controls?.bgImg?.value;
      this.nftService.createNftForm = null;
    }
  }

  ngOnInit(): void {
    if (this._isLoading) return;
    this.groupService.getAllGroupsByClub(
      this.clubName,
      this._page++,
      this.limit,
    );
  }

  ngAfterViewInit():void {
    this.setBackground(this._lastBgImg);
  }

  onSelectFile(event): void {

    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      console.log(this.file)
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageSrc = e.target.result;
          console.log(this.imageSrc)

          this.createNft.patchValue({
            img: this.imageSrc,

          });
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  nextClick(): void {
   this.createPreviewImg().then((dataUrl) => {
        // const img = new Image();
        // img.src = dataUrl;
        // document.getElementById('showImage').appendChild(img);
        this.createNft.patchValue({
          file: this.mediaService.dataURLtoFile(
            dataUrl,
            this.createNft.controls.address.value + '.png',
          ),
        });
        this.imgFormData.append('file', this.createNft.get('file').value);

        const form: NFT = {
          type : 'Ticket',
          forSale: true,
          freezeNft:true,
          serverCaptureFileUrl:'',
          name : this.createNft.controls.name.value,
          description : this.createNft.controls.description.value,
          groupId: this.createNft.controls.group.value.id,
          userId: this.authService.loggedInUser.id,
          clubUserId: this.authService.loggedInUser.clubUserId,
          appPackageId: this.authService.loggedInUser.appPackageId,

        }
        this.nftService.createNFT = form;
        this.nftService.createNFTImg = this.imgFormData;
        this.customDialogService.showCreateNFTticketOptionsDialog();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
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
  setBackground(src?):void {
    const select = <HTMLImageElement>document.querySelector('#bg-image');
    const tick = <HTMLImageElement>document.querySelector('#showImage');
    tick.src = src || (event.target as HTMLImageElement).src || '../../../../../assets/card/1A.svg';
    this.createNft.patchValue({
      bgImg: tick.src,
    });
    // select.style.display = 'block';
  }

  preview(): void {
    this.createPreviewImg().then((dataUrl) => {
      this.nftService.createNftForm = this.createNft;
      this.customDialogService.showCreateNFTticketPreviewDialog(dataUrl,true);
    });
  }

}
