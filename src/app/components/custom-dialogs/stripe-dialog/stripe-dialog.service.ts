import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AsyncStripeDialog } from './async-stripe-dialog';
import { StripeKeyComponent } from './stripe-key/stripe-key.component';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';

@Injectable({
  providedIn: 'root'
})
export class StripeDialogService extends AsyncStripeDialog< StripeKeyComponent | StripePaymentComponent
> {
  constructor(protected matDialog: MatDialog) {
    super(matDialog);
  }

  async openStripeKeyComponent(): Promise<MatDialogRef<StripeKeyComponent>> {
    const { StripeDialogModule: StripeDialogModule } = await import(
      './stripe-dialog.module'
    );
    return this.matDialog.open(StripeDialogModule.getStripeKeyComponent(), {
      disableClose: false,
      panelClass: ['strip-key-dialog-overlay', 'action-dialog'],
    });
  }

  async openStripePaymentComponent(): Promise<MatDialogRef<StripePaymentComponent>> {
    const { StripeDialogModule: StripeDialogModule } = await import(
      './stripe-dialog.module'
    );
    return this.matDialog.open(StripeDialogModule.getStripePaymentComponent(), {
      disableClose: true,
      panelClass: ['strip-payment-dialog-overlay', 'action-dialog'],
    });
  }
}
