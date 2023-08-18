import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: '[t-head]',
  template: `<div #contentWrapper>
    <ng-content></ng-content>
  </div>`,
})
export class TableHeaderComponent {
  @ViewChild('contentWrapper') content?: ElementRef;

  constructor() {}
}
