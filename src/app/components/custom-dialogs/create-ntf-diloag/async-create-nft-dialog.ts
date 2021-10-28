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
  abstract async openCreateNFTComponent(
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
  abstract async openCreateNFTStyleComponent(
    data: DataType,
  ): Promise<MatDialogRef<ComponentType, ReturnType>>;

  // @ts-ignore
  abstract async openCreateNFTMintingComponent(
    data: DataType,
  ): Promise<MatDialogRef<ComponentType, ReturnType>>;
}
