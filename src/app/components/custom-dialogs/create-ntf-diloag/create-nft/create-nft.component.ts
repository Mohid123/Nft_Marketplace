import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Group } from '@app/@core/models/group.model';
import { NFT } from '@app/@core/models/NFT.model';
import { ResponseGroupsByClub } from '@app/@core/models/response-groups-by-club.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { GroupService } from '@app/@core/services/group.service';
import { MediaService } from '@app/@core/services/media.service';
import { NFTService } from '@app/@core/services/nft.service';
import { RouteService } from '@app/@core/services/route.service';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-nft',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.scss'],
})
export class CreateNFTComponent {
  group: Group

  public createNft: FormGroup;
  type: any
  email: any
  date: any
  selectedValue: any
  public file: any
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

  onSelectFile(event) {
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



  this.customDialogService.showCreateNFTStyleDialog();
  // this.nftService.addNft(this.nftService.createNft).pipe(take(1)).subscribe(res=> {
  //   console.log('res:',res);
  // });
}

addNft(){

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
}
