import { Component, Input, OnInit } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { RouteService } from '@app/@core/services/route.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { NFT } from './../../../@core/models/NFT.model';

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


  @Input() nft:NFT;
  constructor(
    private customDialogService: CustomDialogService,
    private spinner: NgxSpinnerService,
    private routeService: RouteService,
  ) { }

  ngOnInit(): void {

    this.spinner.show();

    setTimeout(() => {

      this.spinner.hide();
    }, 2000);
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
}
