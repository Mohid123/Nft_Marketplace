/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Directive } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AsyncCreateNFTDialog<
  ComponentType,
  DataType = unknown,
  ReturnType = unknown,
> {
  constructor(protected matDialog: MatDialog) {}

  // @ts-ignore
  abstract async openCreateNFTticketComponent(
    data: DataType,
  ): Promise<MatDialogRef<ComponentType, ReturnType>>;

  // @ts-ignore
  abstract async openCreateNFTticketPreviewComponent(
    data: DataType,
  ): Promise<MatDialogRef<ComponentType, ReturnType>>;

  // @ts-ignore
  abstract async openCreateMembershipComponent(
    data: DataType,
  ): Promise<MatDialogRef<ComponentType, ReturnType>>;

  // @ts-ignore
  abstract async openCreateNFTOptionsComponent(
    data: DataType,
  ): Promise<MatDialogRef<ComponentType, ReturnType>>;

  // @ts-ignore
  abstract async openCreateNFTticketOptionsComponent(
    data: DataType,
  ): Promise<MatDialogRef<ComponentType, ReturnType>>;

  // @ts-ignore
  abstract async openCreateNFTMembershipOptionsComponent(
    data: DataType,
  ): Promise<MatDialogRef<ComponentType, ReturnType>>;
}
