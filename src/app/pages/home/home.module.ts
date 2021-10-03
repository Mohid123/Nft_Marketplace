import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { HomePage } from './home.page';
import { WalletPage } from './wallet/wallet.page';

const childRoutes: Routes = [
  {
    path: '',
    component: HomePage,
    data: {
      title: 'NFT Market Place',
      description:
        'NFT Market Place Description',
      robots: 'index, follow',
    },
  },
  {
    path: ROUTER_UTILS.config.base.wallet,
    component: WalletPage,
    data: {
      title: 'NFT Walltet',
      description:
        'NFT Wallet Description',
      robots: 'index, follow',
    },
  },
];

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes)
  ],
})
export class HomeModule {}
