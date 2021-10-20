import { Component, OnInit } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { take } from 'rxjs/operators';
import { NFTList } from './../../../@core/models/NFTList.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { NFTService } from './../../../@core/services/nft.service';
import { RouteService } from './../../../@core/services/route.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss']
})
export class WalletPage implements OnInit {

  public nftList: NFTList;
  public clubName: string;

  private _page:number;
  private _isLoading:boolean;

  constructor(
    private authService: AuthService,
    private customDialogService: CustomDialogService,
    private nftService: NFTService,
    private routeService: RouteService,
  ) {
    this._page = 0;
    this._isLoading = false;
    this.clubName = this.routeService.clubName;
    this.getNfts();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    console.log('market palce:');
    // this.nftService.getNft('');
  }

  getNfts(): void {
    if (this._isLoading) return
    this.nftService.getAllNftsByUser(this.clubName, this.authService.loggedInUser.id ,this._page++)
      .pipe(take(1))
      .subscribe((result:ApiResponse<NFTList>) => {
        if (!result.hasErrors()) {
          this.nftList = result.data;
        }
        this._isLoading = false;
      });
  }

}
