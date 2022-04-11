import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { NgOtpInputModule } from 'ng-otp-input';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NavListComponent } from './nav-list.component';


@NgModule({
  declarations: [
    NavListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgOtpInputModule,
    Ng2TelInputModule,
    MatListModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: ROUTER_UTILS.config.errorResponse.notFound,
        component: NavListComponent,
        data: {
          header: false,
          footer: false,
          title: 'The page you were looking for could not be found',
          robots: 'noindex, nofollow',
        },
      },
    ]),
  ],
  exports: [
    NavListComponent
  ]
})
export class SideNavModule { }
