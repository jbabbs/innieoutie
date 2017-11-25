import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector : '[appFocus]'
})
export class FocusDirective implements OnInit {
  constructor(private element: ElementRef) { }

  public ngOnInit() {
    this.element.nativeElement.focus();
  }
}
