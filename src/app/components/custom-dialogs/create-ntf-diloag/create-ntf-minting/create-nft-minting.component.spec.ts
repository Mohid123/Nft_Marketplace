import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNTFMintingComponent } from './create-nft-minting.component';


describe('CreateNTFMintingComponent', () => {
  let component: CreateNTFMintingComponent;
  let fixture: ComponentFixture<CreateNTFMintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNTFMintingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNTFMintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
