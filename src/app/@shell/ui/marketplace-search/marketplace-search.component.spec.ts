import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceSearchComponent } from './marketplace-search.component';

describe('MarketplaceSearchComponent', () => {
  let component: MarketplaceSearchComponent;
  let fixture: ComponentFixture<MarketplaceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
