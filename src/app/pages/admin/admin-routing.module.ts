import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AdminDashboardPage } from './admin-dashboard/admin-dashboard.page';
import { AdminGroupPage } from './admin-group/admin-group.page';
import { AdminSalePage } from './admin-sale/admin-sale.page';
import { AdminSettingPage } from './admin-setting/admin-setting.page';
import { AdminSubscriptionPage } from './admin-subscription/admin-subscription.page';
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
  {
    path: ROUTER_UTILS.config.admin.groups,
    component: AdminGroupPage,
  },
  {
    path: ROUTER_UTILS.config.admin.sale,
    component: AdminSalePage,
  },
  {
    path: ROUTER_UTILS.config.admin.subscription,
    component: AdminSubscriptionPage,
  },
  {
    path: ROUTER_UTILS.config.admin.setting,
    component: AdminSettingPage

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
