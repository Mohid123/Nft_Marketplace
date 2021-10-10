import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CardModule } from './../../@shell/ui/nft-card/card.module';
import { ProfileButtonModule } from './../../@shell/ui/profile-button/profile-button.module';
import { AdminDashboardPage } from './admin-dashboard/admin-dashboard.page';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMarketPlacePage } from './market-place/admin-market-place.page';

@NgModule({
  declarations: [
    AdminDashboardPage,
    AdminMarketPlacePage,
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
