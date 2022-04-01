import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '@app/@core/guards';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AppBannerModule } from '@app/@shell/ui/app-banner/app-banner.module';
import { CardDetailsModule } from '@app/@shell/ui/card-details/card-details.module';
import { HistoryModule } from '@app/@shell/ui/history/history.module';
import { MarketplaceSearchModule } from '@app/@shell/ui/marketplace-search/marketplace-search.module';
import { QrCodeModule } from 'ng-qrcode';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SwiperModule } from 'swiper/angular';
import { AuthGuard } from './../../@core/guards/auth.guard';
import { LoggedInUserSearchModule } from './../../@shell/ui/logged-in-user-search/logged-in-user-search.module';
import { CardModule } from './../../@shell/ui/nft-card/card.module';
import { SwipeModule } from './../../@shell/ui/swiper/swiper.module';
import { CardDetailPage } from './card-detail/card-detail.page';
import { HomePage } from './home.page';
import { MarketPlacePage } from './market-place/market-place.page';
import { PageNotFoundPage } from './page-not-found/page-not-found.page';
import { TradingHistoryPage } from './trading-history/trading-history.page';
import { WalletPage } from './wallet/wallet.page';

const childRoutes: Routes = [
  {
    path: '',
    component: MarketPlacePage,
    data: {
      title: 'NFT Market Place',
      description: 'NFT Market Place Description',
      robots: 'index, follow',
    }
  },
  {
    path: ROUTER_UTILS.config.base.detail + '/:nftId',
    component: CardDetailPage,
    data: {
      title: 'NFT Cart Detail',
      description: 'NFT Cart Detail Description',
      robots: 'index, follow',
    },
    // canActivate: [NoAdminGuard],
  },
  {
    path: ROUTER_UTILS.config.base.tradingHistory,
    component: TradingHistoryPage,
    data: {
      title: 'NFT Trading History',
      description: 'NFT Trading History Description',
      robots: 'index, follow',
    },
  },
  {
    path: 'home',
    component: HomePage,
    data: {
      title: 'NFT Market Place',
      description: 'NFT Market Place Description',
      robots: 'index, follow',
    },
    canActivate: [UserGuard],
  },
  {
    path: ROUTER_UTILS.config.base.wallet,
    component: WalletPage,
    data: {
      title: 'NFT Walltet',
      description: 'NFT Wallet Description',
      robots: 'index, follow',
    },
    canActivate: [AuthGuard],
  },
  {
    path: ROUTER_UTILS.config.base.pageNotfound,
    component: PageNotFoundPage,
    data: {
      title: '404',
      description: '404 Description',
      robots: 'index, follow',
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [HomePage, MarketPlacePage, CardDetailPage, WalletPage, TradingHistoryPage, PageNotFoundPage],
  imports: [

  CommonModule,
    RouterModule.forChild(childRoutes),
    CardModule,
    MarketplaceSearchModule,
    AppBannerModule,
    LoggedInUserSearchModule,
    CardDetailsModule,
    HistoryModule,
    MatMenuModule,
    NgxSpinnerModule,
    QrCodeModule,
    FormsModule,
    SwiperModule,
    SwipeModule
      // BrowserAnimationsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}
