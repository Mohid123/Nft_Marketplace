import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from './../../@core/utils/router.utils';
import { AdminDashboardPage } from './admin-dashboard/admin-dashboard.page';

const routes: Routes = [
  {
    path: ROUTER_UTILS.config.admin.root,
    component: AdminDashboardPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
