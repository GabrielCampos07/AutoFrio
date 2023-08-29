import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: '[inputForm]',
  template: `<div #contentWrapper>
    <ng-content></ng-content>
  </div>`,
})
export class InputFormComponent {
  @ViewChild('contentWrapper') content?: ElementRef;
}
