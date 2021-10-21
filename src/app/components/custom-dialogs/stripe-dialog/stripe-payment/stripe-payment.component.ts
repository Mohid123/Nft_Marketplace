import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { StripeService } from './../../../../@core/services/stripe.service';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss']
})

export class StripePaymentComponent  {
  public stripeForm: FormGroup;

  constructor(
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
    const param = {
      cardNo: this.stripeForm.controls.cardNo.value,
      validity: this.stripeForm.controls.validity.value,
      cvv: this.stripeForm.controls.cvv.value,
    };

    this.stripeService.stripePay(param);
    this.close();
  }
}
