import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard, UserGuard } from '@app/@core/guards';
import { CreatorResolver } from '@app/@core/services/creator-resolver.service';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { NotFoundModule } from '@app/@shell/ui/not-found/not-found.module';
import { FooterModule } from '../ui/footer/footer.module';
import { HeaderModule } from '../ui/header/header.module';
import { LayoutModule } from '../ui/layout/layout.module';
import { NotFoundPage } from '../ui/not-found/not-found.page';
import { NavListComponent } from '../ui/side-nav/nav-list.component';
import { AdminGuard } from './../../@core/guards/admin.guard';
import { NavModule } from './../ui/nav/nav.module';
import { SideNavModule } from './../ui/side-nav/side-nav.module';

const APP_ROUTES: Routes = [
  {
    path: ROUTER_UTILS.config.base.home,
    component: NotFoundPage,
  },
  {
    path: ROUTER_UTILS.config.base.register,
    component: NavListComponent,

  },
  {
    path: ROUTER_UTILS.config.base.clubName,
    resolve: { creator : CreatorResolver},
    children: [
      {
        path: ROUTER_UTILS.config.auth.root,
        loadChildren: () =>
          import('@pages/auth/auth.module').then((m) => m.AuthModule),
        canActivate: [NoAuthGuard],
      },
      {
        path: ROUTER_UTILS.config.admin.root,
        loadChildren: () =>
          import('@pages/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard],
      },
      {
        path: '' ,
        loadChildren: () =>
          import('@pages/home/home.module').then((m) => m.HomeModule),
      },
    ]
  },
  {
    path: ROUTER_UTILS.config.base.dashboard,
    loadChildren: () =>
      import('@pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
    canLoad: [UserGuard],
  },
  {
    path: ROUTER_UTILS.config.settings.root,
    loadChildren: () =>
      import('@pages/settings/settings.module').then((m) => m.SettingsModule),
    canLoad: [UserGuard],
  },
  {
    path: ROUTER_UTILS.config.user.root,
    loadChildren: () =>
      import('@pages/user/user.module').then((m) => m.UserModule),
    canLoad: [UserGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('@shell/ui/not-found/not-found.module').then(
        (m) => m.NotFoundModule,
      ),
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
    SideNavModule
  ],
  exports: [
    RouterModule,
    FooterModule,
    HeaderModule,
    NavModule,
    LayoutModule,
    NotFoundModule,
    SideNavModule
  ],
  providers: [
    CreatorResolver
  ]
})
export class WebShellModule {}
