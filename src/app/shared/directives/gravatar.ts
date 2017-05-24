// https://raw.githubusercontent.com/tb/ng2-gravatar/master/src/gravatar.ts
/*
Usage : <img gravatar [email]="user.email" [size]="16">
*/
import { Directive, ElementRef, Input } from '@angular/core';
import md5 = require("node-md5");

@Directive({
  selector: '[gravatar]'
})
export class GravatarDirective {
  @Input('email') email: string = '';
  @Input('size') size: number = 48;
  @Input('fallback') fallback: string = 'mm';

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    let _md5 = (this.email) ? md5(this.email) : md5('');
    this.elementRef.nativeElement.src = `//www.gravatar.com/avatar/${_md5}?s=${this.size}&d=${this.fallback}`;
  }
}