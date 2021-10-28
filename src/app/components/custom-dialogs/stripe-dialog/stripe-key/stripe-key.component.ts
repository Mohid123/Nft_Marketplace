import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AddStripeKey } from '@app/@core/models/requests/add-stripe-key.model';
import { ResponseStripeStatus } from '@app/@core/models/response-add-stripe-key.model';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from './../../../../@core/models/response.model';
import { CustomDialogService } from './../../../../@core/services/custom-dialog/custom-dialog.service';
import { RouteService } from './../../../../@core/services/route.service';
import { StripeService } from './../../../../@core/services/stripe.service';

@Component({
  selector: 'app-stripe-key',
  templateUrl: './stripe-key.component.html',
  styleUrls: ['./stripe-key.component.scss'],
})
export class StripeKeyComponent {
  public stripeForm: FormGroup;

  constructor(
    private customDialogService: CustomDialogService,
    private formBuilder: FormBuilder,
    private stripeService: StripeService,
    private routeService: RouteService,
    private toastr: ToastrService
  ) {
    this.stripeForm = this.formBuilder.group({
      key: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  addKey(): void {
    const params: AddStripeKey = {
      key: this.stripeForm.controls.key.value,
      clubName: this.routeService.clubName,
    };

    this.stripeService.addKey(params).subscribe((result:ApiResponse<ResponseStripeStatus>)=> {
      if(!result.hasErrors() && result.data.isValid) {
        this.close();
      } else {
    this.toastr.warning('Please enter valid stripe key.', 'Invalid!')
      }
    });
  }

  close(): void {
    this.customDialogService.closeDialogs();
  }
}
