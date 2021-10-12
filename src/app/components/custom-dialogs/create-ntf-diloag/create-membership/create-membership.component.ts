import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl, FormGroup, Validators
} from '@angular/forms';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-create-membership',
  templateUrl: './create-membership.component.html',
  styleUrls: ['./create-membership.component.scss'],
})
export class CreateMembershipComponent {
  public createNft: FormGroup;

  constructor(
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
  ) {
    this.createNft = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    // this.passwordHide= true;
  }

  close(): void {
    this.customDialogService.closeDialogs();
  }
}
