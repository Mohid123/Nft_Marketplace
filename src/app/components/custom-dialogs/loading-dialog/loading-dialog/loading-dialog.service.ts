import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AsyncLoadingDialog } from './async-loading-dialog';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingDialogService extends AsyncLoadingDialog<LoadingDialogComponent> {
  constructor(protected matDialog: MatDialog) {
    super(matDialog);
  }

  async getLoadingDialogComponent(): Promise<MatDialogRef<LoadingDialogComponent>> {
    const { LoadingDialogModule: LoadingDialogModule } = await import(
      '../loading-dialog.module'
    );
    return this.matDialog.open(LoadingDialogModule.getLoadingDialogComponent(), {
      disableClose: false,
      panelClass: ['loading-dialog-overlay', 'action-dialog'],
    });
  }

}
