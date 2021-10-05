import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AdminDashboardPage } from './admin-dashboard/admin-dashboard.page';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminDashboardPage
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ChartsModule
  ]
})
export class AdminModule { }
