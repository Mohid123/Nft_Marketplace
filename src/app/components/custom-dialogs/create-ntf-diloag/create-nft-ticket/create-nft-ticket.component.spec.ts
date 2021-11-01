import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNFTticketComponent } from './create-nft-ticket.component';


describe('CreateNTFComponent', () => {
  let component: CreateNFTticketComponent;
  let fixture: ComponentFixture<CreateNFTticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNFTticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNFTticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
