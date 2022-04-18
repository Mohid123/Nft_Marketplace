import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckpasswordDirective } from './../checkpassword.directive';



@NgModule({
  declarations: [CheckpasswordDirective],
  imports: [ CommonModule],
  exports: [CheckpasswordDirective]
})
export class PasswordMatchModule { }
