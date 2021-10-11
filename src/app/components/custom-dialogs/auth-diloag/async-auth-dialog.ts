/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Directive } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AsyncAuthDialog<
  ComponentType,
  DataType = unknown,
  ReturnType = unknown,
> {
  constructor(protected matDialog: MatDialog) {}

  // @ts-ignore
  abstract async openAdminSignIn(
    data: DataType,
  ): Promise<MatDialogRef<ComponentType, ReturnType>>;

  // @ts-ignore
  abstract async openUserSignIn(
    data: DataType,
  ): Promise<MatDialogRef<ComponentType, ReturnType>>;
}
