import { Component, Input } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { MediaService } from '@app/@core/services/media.service';
import { of } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { Group } from './../../../../@core/models/group.model';
import { NFT } from './../../../../@core/models/NFT.model';
import { ResponseAddGroupMedia } from './../../../../@core/models/response-add-media.model';
import { ApiResponse } from './../../../../@core/models/response.model';
import { NFTService } from './../../../../@core/services/nft.service';

@Component({
  selector: 'app-create-nft-style',
  templateUrl: './create-nft-style.component.html',
  styleUrls: ['./create-nft-style.component.scss'],
})
export class CreateNFTStyleComponent {
  @Input() img: FormData;
  @Input() group: Group;
  @Input() nftForm: NFT;

  price: any;
  copy: any;

  constructor(
    private customDialogService: CustomDialogService,
    private nftService: NFTService,
    private mediaService: MediaService,
  ) {
  }

  save():void {
    this.mediaService
      .uploadMedia('nft', this.img)
      .pipe(
        take(1),
        exhaustMap((res: ApiResponse<ResponseAddGroupMedia>) => {
          console.log('res:',res);
          if (!res.hasErrors()) {
              this.nftForm.serverCaptureFileUrl = res.data.url,
              this.nftForm.path = res.data.url,
              this.nftForm.price = this.price;
              this.nftForm.numberOfCopies = this.copy;
              return this.nftService.addNft(this.nftForm);
          } else {
            return of(null);
          }
        }),
      )
      .subscribe((res: any) => {
        if (res !== null) {
          this.close();
        } else {
          alert('error :' + res.errors[0]?.error?.message);
        }
        console.log('res:', res);
      });
  }

  close(): void {
    this.customDialogService.closeDialogs();
  }
}
