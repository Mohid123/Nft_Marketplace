import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSettingPage } from './admin-setting.page';


describe('AdminSettingPage', () => {
  let component: AdminSettingPage;
  let fixture: ComponentFixture<AdminSettingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSettingPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
