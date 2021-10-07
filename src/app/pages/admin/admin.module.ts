import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CardModule } from './../../@shell/ui/nft-card/card.module';
import { AdminDashboardPage } from './admin-dashboard/admin-dashboard.page';
import { AdminSignInPage } from './admin-dashboard/admin-sign-in/admin-sign-in.page';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminDashboardPage,
    AdminSignInPage
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ChartsModule,
    CardModule
  ]
})
export class AdminModule { }
