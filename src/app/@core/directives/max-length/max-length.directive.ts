import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMaxLength]'
})
export class MaxLengthDirective {

  @Input() length: string;

  @HostListener("keydown", ["$event"])
  onKeydown(event) : void {
    const value = event.target.value;
    const maxLength = parseInt(this.length);
    if (
        event?.key !== 'Backspace' &&
        event?.key !== 'Delete' &&
        event?.key !== 'ArrowLeft' &&
        event?.key !== 'ArrowRight' &&
        value.length > maxLength -1) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

}
