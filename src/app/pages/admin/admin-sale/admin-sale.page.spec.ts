import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSalePage } from './admin-sale.page';


describe('AdminSale.PageComponent', () => {
  let component: AdminSalePage;
  let fixture: ComponentFixture<AdminSalePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSalePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
