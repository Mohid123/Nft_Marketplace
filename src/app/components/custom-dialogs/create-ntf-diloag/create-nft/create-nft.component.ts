import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NFT } from '@app/@core/models/NFT.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { MediaUploadService } from '@app/@core/services/media-upload.service';
import { NFTService } from '@app/@core/services/nft.service';

@Component({
  selector: 'app-create-nft',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.scss'],
})
export class CreateNFTComponent {
  public createNft: FormGroup;
  type: any
  public file: any
  public format: string;
  public url: string;
  constructor(
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
    private cf: ChangeDetectorRef,
    private mediaUpload: MediaUploadService,
    private nftService: NFTService,
  ) {
    this.createNft = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    // this.passwordHide= true;
  }

  onSelectFile(event) {
    this.file = event.target.files && event.target.files[0];
    console.log(this.file)
    if (this.file) {
    const reader = new FileReader();
      reader.readAsDataURL(this.file);
      if (this.file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (this.file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result as string;
        this.cf.detectChanges();
      }
      event.target.value = '';

    }
  }

  // addMedia() {
  //   this.mediaUpload.post
  // }

  nextClick():void{
    this.nftService.createNft = new NFT();
    this.nftService.createNft.serverCaptureFileUrl = this.file;
    console.log(this.type)
  this.customDialogService.showCreateNFTStyleDialog();
  // this.nftService.addNft(this.nftService.createNft).pipe(take(1)).subscribe(res=> {
  //   console.log('res:',res);
  // });
}

addNft(){
  this.nftService.uploadImage('Logo', this.file ).then((data)=>{
    console.log('uploaded')
  })
}
  close(): void {
    this.customDialogService.closeDialogs();
  }
}
