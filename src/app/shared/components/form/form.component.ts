import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { InputFormComponent } from './components/inputForm.component';

@Component({
  selector: 'app-form',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @ContentChildren(InputFormComponent, { descendants: true })
  inputs: QueryList<InputFormComponent> = new QueryList<InputFormComponent>();
  constructor(private appRef: ApplicationRef) {}
}
