import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundPage } from './page-not-found.page';

describe('PageNotFoundPage', () => {
  let component: PageNotFoundPage;
  let fixture: ComponentFixture<PageNotFoundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotFoundPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
