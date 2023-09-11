import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() type: string = 'text';
  @Input() ngModel: any;
  @Input() mask = '';
  @Input() options: any[] | null = [];

  @Output() ngModelChange = new EventEmitter();

  @Output() input = new EventEmitter();

  get _ngModel() {
    return this.ngModel;
  }

  set _ngModel(val) {
    if (val === undefined || val === null) return;
    this.ngModel = val;
    this.ngModelChange.emit(this.ngModel);
  }

  formControl: FormControl = new FormControl();

  constructor() {}

  ngAfterContentInit(): void {
    this.formControl.valueChanges.subscribe((value) => {
      this._ngModel = value;
    });

    if (this.mask) this.type = 'text';
  }

  ngOnChanges(changes: any): void {
    if (changes.ngModel?.currentValue !== undefined)
      this.formControl.setValue(changes.ngModel.currentValue);
  }

  onInput = ($event: any): void => {
    this.input.emit($event);
  };

  valid(): boolean {
    return this.formControl.errors == null;
  }
}
