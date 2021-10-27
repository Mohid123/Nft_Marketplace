import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CardModule } from './../../@shell/ui/nft-card/card.module';
import { AdminDashboardPage } from './admin-dashboard/admin-dashboard.page';
import { AdminGroupPage } from './admin-group/admin-group.page';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminSalePage } from './admin-sale/admin-sale.page';
import { AdminMarketPlacePage } from './market-place/admin-market-place.page';

@NgModule({
  declarations: [
    AdminDashboardPage,
    AdminMarketPlacePage,
    AdminGroupPage,
    AdminSalePage
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ChartsModule,
    CardModule,
    MatIconModule,
    MatMenuModule,
    NgxSpinnerModule
  ]
})
export class AdminModule { }
