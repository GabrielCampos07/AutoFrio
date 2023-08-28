import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableItem]',
})
export class TableItemDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
