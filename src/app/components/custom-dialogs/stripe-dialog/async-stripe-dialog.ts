/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Directive } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AsyncStripeDialog<
  ComponentType,
  DataType = unknown,
  ReturnType = unknown,
> {
  constructor(protected matDialog: MatDialog) {}

  // @ts-ignore
  abstract async openStripeKeyComponent(
    data: DataType,
  ): Promise<MatDialogRef<ComponentType, ReturnType>>;

  // @ts-ignore
  abstract async openStripePaymentComponent(
    data: DataType,
  ): Promise<MatDialogRef<ComponentType, ReturnType>>;
}
