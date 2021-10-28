import { ChangeDetectorRef, Component } from '@angular/core';
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
  selector: 'app-create-nft',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.scss'],
})
export class CreateNFTComponent {

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
  public limit = 6;

  private _page: number;
  private _isLoading: boolean;
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
      description: new FormControl('', [Validators.required]),
      file: new FormControl(''),
      img: new FormControl(''),
      date: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(32)]],
      group: [null, [Validators.required]]
    });

    this.routeService.clubName$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((clubName) => {
        this.clubName = clubName;
      });

  }

  ngOnInit(): void {
    if (this._isLoading) return;
    this.groupService.getAllGroupsByClub(
      this.clubName,
      this._page++,
      this.limit,
    );
  }

  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  nextClick(): void {
    const node = document.getElementById('bg-image');
    htmlToImage
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
      .then((dataUrl) => {
        // const img = new Image();
        // img.src = dataUrl;
        // document.getElementById('view-img').appendChild(img);
        this.createNft.patchValue({
          file: this.mediaService.dataURLtoFile(
            dataUrl,
            this.createNft.controls.address.value + '.png',
          ),
        });
        console.log('asdasd:');
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
        console.log('asdasdasd:',this.imgFormData);
        this.customDialogService.showCreateNFTStyleDialog(this.imgFormData,form);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }

  close(): void {
    this.customDialogService.closeDialogs();
  }

  // Click on each image and display each individually on background div
  setBackground(): void {
    // const select = <HTMLImageElement>document.querySelector('#bg-image');
    const tick = <HTMLImageElement>document.querySelector('#showImage');
    Array.from(document.querySelectorAll('#ticket')).forEach((image) => {
      image.addEventListener('click', (event) => {
        // select.style.display = 'block';
        tick.src = (event.target as HTMLImageElement).src;
      });
    });
  }
}
