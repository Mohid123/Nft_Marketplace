import { Component } from '@angular/core';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-export-key',
  templateUrl: './export-key.component.html',
  styleUrls: ['./export-key.component.scss']
})
export class ExportKeyComponent  {

  constructor(
    private customDialogService:CustomDialogService,
  ) { }

  close():void {
    this.customDialogService.closeDialogs();
  }

}
