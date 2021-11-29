import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AdminHeaderModule } from './../../@shell/ui/admin-header/admin-header.module';
import { CardModule } from './../../@shell/ui/nft-card/card.module';
import { AdminDashboardPage } from './admin-dashboard/admin-dashboard.page';
import { AdminGroupPage } from './admin-group/admin-group.page';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminSalePage } from './admin-sale/admin-sale.page';
import { AdminSettingPage } from './admin-setting/admin-setting.page';
import { AdminMarketPlacePage } from './market-place/admin-market-place.page';

@NgModule({
  declarations: [
    AdminDashboardPage,
    AdminMarketPlacePage,
    AdminGroupPage,
    AdminSalePage,
    AdminSettingPage
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminHeaderModule,
    ChartsModule,
    CardModule,
    MatIconModule,
    MatMenuModule,
    NgxSpinnerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    ToastrModule.forRoot( {positionClass: 'toast-top-right'} )
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
