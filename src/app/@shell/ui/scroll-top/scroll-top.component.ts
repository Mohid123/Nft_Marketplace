/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent  {
//   windowScrolled!: boolean;
//   constructor(@Inject(DOCUMENT) private document: Document) { }
//   @HostListener("window:scroll", [])
//   onWindowScroll() {
//       if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
//           this.windowScrolled = true;
//       }
//      else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
//           this.windowScrolled = false;
//       }
//   }

//   scrollToTop() {
//     (function smoothscroll() {
//         const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
//         if (currentScroll > 0) {
//             window.requestAnimationFrame(smoothscroll);
//             window.scrollTo(0, currentScroll - (currentScroll / 4));
//         }
//     })();
// }

@Output() scrollToTop = new EventEmitter<void>();

constructor() { }

onScrollToTop(): void {
  this.scrollToTop.emit();
}


}
