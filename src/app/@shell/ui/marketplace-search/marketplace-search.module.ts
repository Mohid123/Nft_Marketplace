import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarketplaceSearchComponent } from './marketplace-search.component';




@NgModule({
  declarations: [MarketplaceSearchComponent],
  imports: [
    CommonModule
  ],
  exports: [MarketplaceSearchComponent]
})
export class MarketplaceSearchModule { }
