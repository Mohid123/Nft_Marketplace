import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { NavListComponent } from './nav-list.component';


@NgModule({
  declarations: [
    NavListComponent
  ],
  imports: [


  CommonModule,
    MatListModule,
    RouterModule.forChild([
      {
        path: ROUTER_UTILS.config.base.register,
        component: NavListComponent,
        data: {
          header: false,
          footer: false,
          title: 'The page you were looking for could not be found',
          robots: 'noindex, nofollow',
        },
      },
    ]),
  ],
  exports: [
    NavListComponent
  ]
})
export class SideNavModule { }
