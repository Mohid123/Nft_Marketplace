import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminDashboardPage } from './admin-dashboard/admin-dashboard.page';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminDashboardPage
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
