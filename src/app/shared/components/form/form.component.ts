import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-form',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @ContentChildren(InputComponent, { descendants: true })
  inputs: QueryList<InputComponent> = new QueryList<InputComponent>();
  constructor(private appRef: ApplicationRef) {}
}
