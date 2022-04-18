import { Component } from '@angular/core';
import { CustomDialogService } from './../../../../../../@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent {

  constructor(
    private customDialogService: CustomDialogService
  ) { }

  close(): void {
    this.customDialogService.closeDialogs();
  }

}
