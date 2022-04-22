/* eslint-disable @typescript-eslint/no-empty-function */
import { Directive, HostListener } from '@angular/core';
@Directive({
  selector: '[appSpaceBetween]'
})
export class SpaceBetweenDirective {
  constructor() { }
  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 6) {
      trimmed = trimmed.substr(0, 6);
    }
    const numbers = [];
    for (let i = 0; i < trimmed.length; i += 1) {
      numbers.push(trimmed.substr(i, 1));
    }
    input.value = numbers.join('        ');
  }
}
