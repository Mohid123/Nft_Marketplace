import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NFT } from '@app/@core/models/NFT.model';

@Component({
  selector: 'app-resale',
  templateUrl: './resale.dialog.html',
  styleUrls: ['./resale.dialog.scss'],
})
export class ResaleDialog implements OnInit {
  @Input() nft: NFT;
  public priceFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ResaleDialog>,
    private formBuilder: FormBuilder,
  ) {
    this.priceFormGroup = this.formBuilder.group({
      price: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(999999),
      ]),
    });
  }

  ngOnInit(): void {
    this.priceFormGroup.controls.price.setValue(this.nft?.price);
  }

  close(): void {
    this.dialogRef.close(0);
  }

  onConfirmClick(value): void {
    this.dialogRef.close(value);
  }

}
