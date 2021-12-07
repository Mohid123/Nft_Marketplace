import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AsyncExportKeyDialog } from './async-export-key-dialog';
import { ExportKeyComponent } from './export-key/export-key.component';

@Injectable({
  providedIn: 'root'
})
export class ExportKeyService extends AsyncExportKeyDialog<ExportKeyComponent> {

  constructor(protected matDialog: MatDialog) {
    super(matDialog);
  }

  async getExportKeyComponent(): Promise<
  MatDialogRef<ExportKeyComponent>
> {
  const { ExportKeyModule: ExportKeyModule } = await import(
    './export-key.module'
  );
  return this.matDialog.open(
    ExportKeyModule.getExportKeyComponent(),
    {
      disableClose: false,
      panelClass: ['export-key-overlay', 'action-dialog'],
    },
  );
}

}
