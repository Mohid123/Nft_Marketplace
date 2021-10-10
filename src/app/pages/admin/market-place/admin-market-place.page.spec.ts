import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMarketPlacePage } from './admin-market-place.page';


describe('MarketPlacePage', () => {
  let component: AdminMarketPlacePage;
  let fixture: ComponentFixture<AdminMarketPlacePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMarketPlacePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMarketPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
