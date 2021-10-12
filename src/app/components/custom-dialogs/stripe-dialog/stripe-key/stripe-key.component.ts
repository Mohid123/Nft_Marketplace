import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-stripe-key',
  templateUrl: './stripe-key.component.html',
  styleUrls: ['./stripe-key.component.scss']
})
export class StripeKeyComponent {

  public stripeForm: FormGroup;

  constructor(
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder
  ) {
    this.stripeForm = this.formBuilder.group({
      key: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  close():void {
    this.customDialogService.closeDialogs();
  }

}
