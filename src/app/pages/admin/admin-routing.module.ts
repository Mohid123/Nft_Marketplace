import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardPage } from './admin-dashboard/admin-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
