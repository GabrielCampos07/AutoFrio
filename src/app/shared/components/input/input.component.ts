import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Output() modelChange = new EventEmitter();

  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() required: boolean = false;

  @Input() get model() {
    return this._model;
  }

  set model(value: string) {
    this._model = value;
  }

  private _model: string = '';

  constructor() {}

  modelChanging(): void {
    this.modelChange.emit(this.model);
  }
}
