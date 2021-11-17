import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMaxLength]'
})
export class MaxLengthDirective {

  @Input() maxlength: string;

  @HostListener("keydown", ["$event"])
  onKeydown(event) : void {
    const value = event.target.value;
    const maxLength = parseInt(this.maxlength);
    if (value.length > maxLength -1) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

}
