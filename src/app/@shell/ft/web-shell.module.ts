import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAdminGuard, NoAuthGuard, UserGuard } from '@app/@core/guards';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { NotFoundModule } from '@app/@shell/ui/not-found/not-found.module';
import { FooterModule } from '../ui/footer/footer.module';
import { HeaderModule } from '../ui/header/header.module';
import { LayoutModule } from '../ui/layout/layout.module';
import { NotFoundPage } from '../ui/not-found/not-found.page';
import { AdminGuard } from './../../@core/guards/admin.guard';
import { NavModule } from './../ui/nav/nav.module';

const APP_ROUTES: Routes = [
  // {
  //   path: ROUTER_UTILS.config.base.home,
  //   component: NotFoundPage,
  //   canActivate: [NoAdminGuard, UserGuard],
  // },
  {
    path: ROUTER_UTILS.config.base.clubName + '/' + ROUTER_UTILS.config.auth.root,
    loadChildren: async () =>
      (await import('@pages/auth/auth.module')).AuthModule,
    canLoad: [NoAuthGuard],
  },
  {
    path: ROUTER_UTILS.config.base.clubName + '/' + ROUTER_UTILS.config.admin.root,
    loadChildren: async () =>
      (await import('@pages/admin/admin.module')).AdminModule,
    canLoad: [AdminGuard],
  },
  {
    path: ROUTER_UTILS.config.base.clubName,
    loadChildren: async () =>
      (await import('@pages/home/home.module')).HomeModule,
    canLoad: [NoAdminGuard],
  },
  {
    path: ROUTER_UTILS.config.base.dashboard,
    loadChildren: async () =>
      (await import('@pages/dashboard/dashboard.module')).DashboardModule,
    canLoad: [UserGuard],
  },
  {
    path: ROUTER_UTILS.config.settings.root,
    loadChildren: async () =>
      (await import('@pages/settings/settings.module')).SettingsModule,
    canLoad: [UserGuard],
  },
  {
    path: ROUTER_UTILS.config.user.root,
    loadChildren: async () =>
      (await import('@pages/user/user.module')).UserModule,
    canLoad: [UserGuard],
  },
  {
    path: '**',
    loadChildren: async () =>
      (await import('@shell/ui/not-found/not-found.module')).NotFoundModule,
    component: NotFoundPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(APP_ROUTES),
    FooterModule,
    HeaderModule,
    LayoutModule,
    NotFoundModule,
  ],
  exports: [
    RouterModule,
    FooterModule,
    HeaderModule,
    NavModule,
    LayoutModule,
    NotFoundModule,
  ],
})
export class WebShellModule {}
