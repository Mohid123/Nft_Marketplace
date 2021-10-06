import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInUserSearchComponent } from './logged-in-user-search.component';

describe('LoggedInUserSearchComponent', () => {
  let component: LoggedInUserSearchComponent;
  let fixture: ComponentFixture<LoggedInUserSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedInUserSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInUserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
