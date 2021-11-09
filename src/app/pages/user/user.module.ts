import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyProfilePage } from './pages/my-profile/my-profile.page';
import { OverviewPage } from './pages/overview/overview.page';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [MyProfilePage, OverviewPage],
  imports: [
      CommonModule,
      // NgxSpinnerModule,
      // BrowserAnimationsModule,
     UserRoutingModule],
    //  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
