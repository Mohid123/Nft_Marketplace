import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AsyncGroupDialog } from './async-group-dialog';
import { CreateGroupComponent } from './create-group/create-group.component';

@Injectable({
  providedIn: 'root'
})
export class CreateGroupService extends AsyncGroupDialog< CreateGroupComponent> {
  constructor(protected matDialog: MatDialog) {
    super(matDialog);
  }

  async openCreateGroup(): Promise<MatDialogRef<CreateGroupComponent>> {
    const { CreateGroupDialogModule: CreateGroupDialogModule } = await import(
      './create-group-dialog.module'
    );
    return this.matDialog.open(CreateGroupDialogModule.getCreateGroupComponent(), {
      disableClose: false,
      panelClass: ['create-group-dialog-overlay', 'action-dialog'],
    });
  }
}
