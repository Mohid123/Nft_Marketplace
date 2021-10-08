import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CardModule } from './../../@shell/ui/nft-card/card.module';
import { ProfileButtonModule } from './../../@shell/ui/profile-button/profile-button.module';
import { AdminDashboardPage } from './admin-dashboard/admin-dashboard.page';
import { AdminSignInPage } from './admin-dashboard/admin-sign-in/admin-sign-in.page';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminDashboardPage,
    AdminSignInPage,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ChartsModule,
    CardModule,
    ProfileButtonModule
  ]
})
export class AdminModule { }
