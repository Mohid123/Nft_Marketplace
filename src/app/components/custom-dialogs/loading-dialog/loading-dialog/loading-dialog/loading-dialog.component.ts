import { Component, Input } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.scss']
})
export class LoadingDialogComponent {

  @Input() status: string;

  constructor(
    private customDialogService: CustomDialogService
  ) { }

  close(): void {
    this.customDialogService.closeDialogs();
  }
}
