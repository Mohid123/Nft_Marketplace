import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ProfileButtonModule } from './../profile-button/profile-button.module';
import { SideNavModule } from './../side-nav/side-nav.module';
import { MarketplaceSearchComponent } from './marketplace-search.component';


@NgModule({
  declarations: [MarketplaceSearchComponent],
  imports: [




  CommonModule,
  SideNavModule,
    ProfileButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule

  ],
  exports: [MarketplaceSearchComponent]
})
export class MarketplaceSearchModule { }
