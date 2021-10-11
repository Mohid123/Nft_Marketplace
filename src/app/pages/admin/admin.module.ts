import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ChartsModule } from 'ng2-charts';
import { CardModule } from './../../@shell/ui/nft-card/card.module';
import { AdminDashboardPage } from './admin-dashboard/admin-dashboard.page';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMarketPlacePage } from './market-place/admin-market-place.page';
import { AdminGroupPage } from './admin-group/admin-group.page';

@NgModule({
  declarations: [
    AdminDashboardPage,
    AdminMarketPlacePage,
    AdminGroupPage,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ChartsModule,
    CardModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class AdminModule { }
