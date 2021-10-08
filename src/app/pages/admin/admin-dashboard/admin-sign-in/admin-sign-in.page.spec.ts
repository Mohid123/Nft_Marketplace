import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignInPage } from './admin-sign-in.page';

describe('AdminSignInPage', () => {
  let component: AdminSignInPage;
  let fixture: ComponentFixture<AdminSignInPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSignInPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
