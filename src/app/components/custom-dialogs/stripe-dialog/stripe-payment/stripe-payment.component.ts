import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NFT } from '@app/@core/models/NFT.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { take } from 'rxjs/operators';
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

  public stripeForm: FormGroup;

  constructor(
    private authService: AuthService,
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
    private stripeService: StripeService,
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
        number: this.stripeForm.controls.cardNo.value,
        expMonth: this.stripeForm.controls.validity.value,
        expYear: this.stripeForm.controls.validity.value,
        cvc: +this.stripeForm.controls.cvv.value
      },
      payment : this.nft.price,
      description : '',
      userId : this.authService.loggedInUser.id,
      nftId : this.nft.id,
      clubUserId : this.authService.loggedInUser.clubUserId,
    };

    this.stripeService.stripePay(param).pipe(take(1)).subscribe((res:ApiResponse<any>)=> {
      if(!res.hasErrors()) {
        console.log('success:',res);
        this.close();
      } else {
        alert('error :' + res.errors[0]?.error?.message);
      }
    });
  }
}
