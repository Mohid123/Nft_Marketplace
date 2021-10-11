import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNTFOptionsComponent } from './create-nft-options.component';


describe('CreateNTFOptionsComponent', () => {
  let component: CreateNTFOptionsComponent;
  let fixture: ComponentFixture<CreateNTFOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNTFOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNTFOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
