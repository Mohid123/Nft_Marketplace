import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {

  public groupForm: FormGroup;

  constructor(
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder
  ) {
    this.groupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [ Validators.required, Validators.minLength(6) ])
    });
  }

  close():void {
    this.customDialogService.closeDialogs();
  }
}
