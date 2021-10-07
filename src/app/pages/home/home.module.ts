import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AppBannerModule } from '@app/@shell/ui/app-banner/app-banner.module';
import { CardDetailsModule } from '@app/@shell/ui/card-details/card-details.module';
import { MarketplaceSearchModule } from '@app/@shell/ui/marketplace-search/marketplace-search.module';
import { LoggedInUserSearchModule } from './../../@shell/ui/logged-in-user-search/logged-in-user-search.module';
import { CardModule } from './../../@shell/ui/nft-card/card.module';
import { CardDetailPage } from './card-detail/card-detail.page';
import { HomePage } from './home.page';
import { MarketPlacePage } from './market-place/market-place.page';
import { TradingHistoryPage } from './trading-history/trading-history.page';
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
    path:  ROUTER_UTILS.config.base.detail,
    component: CardDetailPage,
    data: {
      title: 'NFT Cart Detail',
      description:
        'NFT Cart Detail Description',
      robots: 'index, follow',
    },
  },
  {
    path:  ROUTER_UTILS.config.base.tradingHistory,
    component: TradingHistoryPage,
    data: {
      title: 'NFT Trading History',
      description:
        'NFT Trading History Description',
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
  declarations: [HomePage, MarketPlacePage, CardDetailPage, WalletPage, TradingHistoryPage],
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes),
    CardModule,
    MarketplaceSearchModule,
    AppBannerModule,
    LoggedInUserSearchModule,
    CardDetailsModule



  ],
})
export class HomeModule {}
