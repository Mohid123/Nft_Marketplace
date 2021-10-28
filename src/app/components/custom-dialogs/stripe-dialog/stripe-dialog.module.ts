import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { StripeKeyComponent } from './stripe-key/stripe-key.component';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';



@NgModule({
  declarations: [StripeKeyComponent, StripePaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule],
})

export class StripeDialogModule {
  static getStripeKeyComponent(): typeof StripeKeyComponent {
    return StripeKeyComponent;
  }
  static getStripePaymentComponent(): typeof StripePaymentComponent {
    return StripePaymentComponent;
  }
}
