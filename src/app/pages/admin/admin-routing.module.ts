import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AdminDashboardPage } from './admin-dashboard/admin-dashboard.page';
import { AdminMarketPlacePage } from './market-place/admin-market-place.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardPage,
  },
  {
    path: ROUTER_UTILS.config.admin.marketplace,
    component: AdminMarketPlacePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
