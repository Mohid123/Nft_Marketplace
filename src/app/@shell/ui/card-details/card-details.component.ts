import { Component, Input, OnInit } from '@angular/core';
import { CreatorService } from '@app/@core/services/creator.service';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { NFTService } from '@app/@core/services/nft.service';
import { RouteService } from '@app/@core/services/route.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { NFT } from './../../../@core/models/NFT.model';
import { ApiResponse } from './../../../@core/models/response.model';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  isAdminPanel$: Observable<boolean> = this.routeService.isAdminPanel$;
  public userName: any
  public profilePic: any
  public loggedInUser: any;
  creator$ = this.creatorService.Creator$;


  @Input() nft:NFT;
  constructor(
    private customDialogService: CustomDialogService,
    private spinner: NgxSpinnerService,
    private routeService: RouteService,
    private creatorService: CreatorService,
    private nftService: NFTService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.userName = JSON.parse(localStorage.getItem('App/user'))
    this.profilePic = JSON.parse(localStorage.getItem('App/user'))
    this.loggedInUser = JSON.parse(localStorage.getItem('App/loggedInUser'))
    //for test
    // let num = 0;
    // setInterval(() => {
    //   console.log('numb:',num);
    //     if(num == 0) {
    //       this.nft.nftStatus = 'Active'
    //     } else if (num == 1) {
    //       this.nft.nftStatus = 'Minted'
    //     } else {
    //       this.nft.nftStatus = 'Draft'
    //     }
    //     if(num == 2) {
    //       num = 0;
    //     }
    //     num++;
    // }, 5000);
  }

  buyNow():void {
    this.customDialogService.showStripePaymenDialog(this.nft);
  }

  async resale():Promise<void> {
    const dialogRef = await this.customDialogService.showReSaleDialog(this.nft);;
    dialogRef.afterClosed().subscribe((resalePrice: number) => {
      if(resalePrice > 0) {
        this.nftService.updateNftResaleStatus(this.nft.id , true , resalePrice.toString()).subscribe((result:ApiResponse<any>)=>{
          if (!result.hasErrors()) {
            this.nftService.getNft(this.nft.id).pipe(take(1)).subscribe((result:ApiResponse<NFT>) => {
              if (!result.hasErrors()) {
                // console.log('nft after activate resale:',result.data);
                this.nft = result.data;
              }
            });
          }
        })
      }
    });
  }

  cancelResale(): void {
    // console.log('cancelResale:',);
    this.nftService.updateNftResaleStatus(this.nft.id , false).subscribe((result:ApiResponse<any>)=>{
      if (!result.hasErrors()) {
        this.nftService.getNft(this.nft.id).pipe(take(1)).subscribe((result:ApiResponse<NFT>) => {
          if (!result.hasErrors()) {
            // console.log('nft after activate resale:',result.data);
            this.nft = result.data;
          }
        });
      }
    })
  }
}
