import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupPage } from './admin-group.page';

describe('AdminGroupPage', () => {
  let component: AdminGroupPage;
  let fixture: ComponentFixture<AdminGroupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
