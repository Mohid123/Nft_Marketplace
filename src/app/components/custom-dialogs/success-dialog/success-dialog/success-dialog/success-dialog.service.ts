import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AsyncSuccessDialog } from './async-success-dialog';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class SuccessDialogService extends AsyncSuccessDialog<SuccessDialogComponent> {
  constructor(protected matDialog: MatDialog) {
    super(matDialog);
  }

  async getSuccessDialogComponent(): Promise<MatDialogRef<SuccessDialogComponent>> {
    const { SuccessDialogModule: SucessDialogModule } = await import(
      '../success-dialog.module'

    );
    return this.matDialog.open(SucessDialogModule.getSuccessDialogComponent(), {
      disableClose: false,
      panelClass: ['loading-dialog-overlay', 'action-dialog'],
    });
  }

}
