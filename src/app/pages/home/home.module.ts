import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AppBannerModule } from '@app/@shell/ui/app-banner/app-banner.module';
import { MarketplaceSearchModule } from '@app/@shell/ui/marketplace-search/marketplace-search.module';
import { CardModule } from './../../@shell/ui/nft-card/card.module';
import { HomePage } from './home.page';
import { MarketPlacePage } from './market-place/market-place.page';
import { WalletPage } from './wallet/wallet.page';

const childRoutes: Routes = [
  {
    path: '',
    component: MarketPlacePage,
    data: {
      title: 'NFT Market Place',
      description:
        'NFT Market Place Description',
      robots: 'index, follow',
    },
  },
  {
    path: 'home',
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
  declarations: [HomePage, MarketPlacePage],
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes),
    CardModule,
    MarketplaceSearchModule,
    AppBannerModule
  ],
})
export class HomeModule {}
