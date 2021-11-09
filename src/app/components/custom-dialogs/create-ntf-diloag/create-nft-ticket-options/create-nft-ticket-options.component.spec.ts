import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNTFStyleComponent } from './create-nft-ticket-options.component';


describe('CreateNTFStyleComponent', () => {
  let component: CreateNTFStyleComponent;
  let fixture: ComponentFixture<CreateNTFStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNTFStyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNTFStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
