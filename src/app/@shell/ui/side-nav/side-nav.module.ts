import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
//firebase service + environmnet module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { TrimModule } from '@app/@core/directives/trim/trim.module';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { environment } from '@environments/environment';
import { AngularOtpLibModule } from 'angular-otp-box';
import { NgOtpInputModule } from 'ng-otp-input';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { SwiperModule } from 'swiper/angular';
import { NumberOnlyModule } from './../../../@core/directives/number-only/number-only.module';
import { SpacebetweenModule } from './../../../@core/directives/spacebetween/spacebetween.module';
import { FireAuthService } from './../../../@core/services/fire-auth.service';
import { NavListComponent } from './nav-list.component';
@NgModule({
  declarations: [
    NavListComponent,
  ],
  imports: [

  SwiperModule,
  NumberOnlyModule,
  SpacebetweenModule,
    NgOtpInputModule,
    AngularOtpLibModule,
    TrimModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    CommonModule,
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
  ],
  providers: [FireAuthService, {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
})
export class SideNavModule { }
