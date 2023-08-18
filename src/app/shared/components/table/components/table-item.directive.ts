import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[TableItem]',
})
export class TableItemDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
