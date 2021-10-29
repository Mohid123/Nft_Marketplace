import { Component, OnInit } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';
import { environment } from './../../../../environments/environment.prod';
import { Group } from './../../../@core/models/group.model';
import { NFTList } from './../../../@core/models/NFTList.model';
import { ResponseGroupsByClub } from './../../../@core/models/response-groups-by-club.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { GroupService } from './../../../@core/services/group.service';
import { NFTService } from './../../../@core/services/nft.service';
import { RouteService } from './../../../@core/services/route.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  public type = '';

  public nftList: NFTList;
  public clubName: string;
  public groups: Group[];
  public totalCount: number;

  public limit = 6 ;
  public page:number;
  public nftLimit = environment.limit ;

  private _isLoading: boolean;
  public filterGroup: Group;

  public searchValue = '';

  constructor(
    private authService: AuthService,
    private customDialogService: CustomDialogService,
    private spinner: NgxSpinnerService,
    private groupService: GroupService,
    private nftService: NFTService,
    private routeService: RouteService,
  ) {
    this.page = 1;
    this._isLoading = false;
    this.clubName = this.routeService.clubName;
    this.getGroups();
    this.getNfts();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    console.log('market palce:');
    // this.nftService.getNft('');
  }

  getNfts(): void {
    if (this._isLoading) return;
    this.nftService
      .getAllNftsByUser(
        this.clubName,
        this.authService.loggedInUser.id,
        this.page,
        this.searchValue,
        this.filterGroup?.id,
        this.type
      )
      .pipe(take(1))
      .subscribe((result: ApiResponse<NFTList>) => {
        if (!result.hasErrors()) {
          this.nftList = result.data;
        }
        this._isLoading = false;
      });
  }

  next():void {
    this.page++;
    this.getNfts();
  }

  previous():void {
    this.page--;
    this.getNfts();
  }

  getGroups(): void {
    this.groupService
      .getUsersGroups(
        this.clubName,
        this.authService.loggedInUser.id,
        this.page,
      )
      .pipe(take(1))
      .subscribe((result: ApiResponse<ResponseGroupsByClub>) => {
        if (!result.hasErrors()) {
          this.totalCount = result.data.totalCount;
          this.groups = result.data?.data;
        }
        this._isLoading = false;
      });
  }

  filterBy (group:Group) :void {
    this.page = 1;
    this.filterGroup = group;
    this.getNfts();
    console.log('group:',group);

  }

  search(searchValue): void {
    this.searchValue = searchValue;
    this.page = 1;
    this.getNfts();
  }

  setType(type:string) {
    this.type = type;
    this.page = 1;
    this.getNfts();
  }
}
