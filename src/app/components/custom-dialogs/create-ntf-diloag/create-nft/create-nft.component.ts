import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-nft',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.scss']
})
export class CreateNFTComponent implements OnInit {

  public createNft: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createNft = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
    // this.passwordHide= true;
  }

  ngOnInit(): void {
  }

}
