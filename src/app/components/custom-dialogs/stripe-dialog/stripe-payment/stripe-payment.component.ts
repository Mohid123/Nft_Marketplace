import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NFT } from '@app/@core/models/NFT.model';
import { CreatorService } from '@app/@core/services/creator.service';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BuyNFT } from './../../../../@core/models/requests/buy-nft.model';
import { ApiResponse } from './../../../../@core/models/response.model';
import { StripeService } from './../../../../@core/services/stripe.service';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss']
})

export class StripePaymentComponent  {

  @Input() nft:NFT;

  creator$ = this.creatorService.Creator$;
  public stripeForm: FormGroup;
  public isLoading: boolean;

  constructor(
    private authService: AuthService,
    private creatorService: CreatorService,
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
    private stripeService: StripeService,
    private toastr: ToastrService,
  ) {
    this.stripeForm = this.formBuilder.group({
      cardNo: new FormControl('', [Validators.required, Validators.minLength(3)]),
      validity: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  close(): void {
    this.customDialogService.closeDialogs();
  }

  payNowClick(): void {

    const param: BuyNFT = {
      card : {
        number: this.stripeForm.controls.cardNo.value.toString(),
        expMonth: +this.stripeForm.controls.validity.value.substring(0, 2),
        expYear: +this.stripeForm.controls.validity.value.substring(3, 5),
        cvc: +this.stripeForm.controls.cvv.value
      },
      payment : this.nft.price,
      description : '',
      userId : this.authService.loggedInUser.id,
      nftId : this.nft.id,
      clubUserId : this.authService.loggedInUser.clubUserId,
    };
    this.isLoading = true;
    this.stripeService.purchaseNFT(param).subscribe((res:ApiResponse<NFT>)=> {
      this.isLoading = false;
      if(!res.hasErrors()) {
        this.customDialogService.showLoadingDialog('Transferring In Process');
        this.stripeService.purchaseNFTSuccess(param.nftId)
         setTimeout(() => {
           this.customDialogService.closeDialogs();
         }, 3000);
       } else {
         this.toastr.warning(res.errors[0]?.error?.message, 'Error!');
       }
     });
    // this.close();
  }

  isDateValid() {
    const date = <HTMLInputElement>document.getElementById('dated');
    date.value = date.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'')
  }


}
