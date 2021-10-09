import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileButtonModule } from './../profile-button/profile-button.module';
import { MarketplaceSearchComponent } from './marketplace-search.component';




@NgModule({
  declarations: [MarketplaceSearchComponent],
  imports: [
    CommonModule,
    ProfileButtonModule
  ],
  exports: [MarketplaceSearchComponent]
})
export class MarketplaceSearchModule { }
