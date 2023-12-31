import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

  @Output() public ngModelChange = new EventEmitter();

  @Output() public input = new EventEmitter();

  get _ngModel() {
    return this.ngModel;
  }

  set _ngModel(val) {
    if (val === undefined || val === null) return;
    this.ngModel = val;
    this.ngModelChange.emit(this.ngModel);
  }

  public formControl: FormControl = new FormControl();

  constructor() {}

  modelChanging(): void {
    this.ngModelChange.emit(this.ngModel);
  }

  ngAfterContentInit(): void {
    this.formControl.valueChanges.subscribe((value) => {
      this._ngModel = value;
    });
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
