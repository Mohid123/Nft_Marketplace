import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";


function validatePassword(): ValidatorFn {
  return (control: AbstractControl) => {
    let isValid = false;
    if (control && control instanceof FormGroup) {
      const group = control as FormGroup;
      if (group.controls['passwordA'] && group.controls['passwordB']) {
        isValid = group.controls['passwordA'].value == group.controls['passwordB'].value;
      }
    }
    if (isValid) {
      return null;
    } else {
      return { 'passwordCheck': 'failed' }
    }
  }
}

@Directive({
  selector: '[appCheckpassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CheckpasswordDirective, multi: true }]
})
export class CheckpasswordDirective implements Validator {

  private valFn;

  constructor() {
    this.valFn = validatePassword();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.valFn(c);
  }

}
