import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { SwiperModule } from "swiper/angular";
import { NotFoundPage } from './not-found.page';

@NgModule({
  declarations: [NotFoundPage],
  imports: [
    SwiperModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: ROUTER_UTILS.config.errorResponse.notFound,
        component: NotFoundPage,
        data: {
          header: false,
          footer: false,
          title: 'The page you were looking for could not be found',
          robots: 'noindex, nofollow',
        },
      },
    ]),
  ],

})
export class NotFoundModule {}
