import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxState } from '../../../enums/checkbox-state.enum';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, useExisting: CheckboxComponent, multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {

  @ViewChild('checkbox') checkbox: ElementRef;

  @Input() text;

  @Input() set checked(isChecked) {
    this.setState(isChecked ? CheckboxState.CHECKED : CheckboxState.UNCHECKED);
  }

  @Output() stateChanged = new EventEmitter<CheckboxState>();

  private _state: CheckboxState;

  // Called from template when checkbox checked/unchecked
  onCheckedChange(event: any): void {
    this.setState(event.target.checked, true);
    this._onChange(event.target.checked);

    this.stateChanged.emit(this._state);
  }

  get value(): boolean {
    return [ CheckboxState.CHECKED, CheckboxState.INDETERMINATE ].indexOf(this._state) > -1;
  }

  setState(value: CheckboxState | any, isModelOnly = false): void {
    switch (value) {
      case CheckboxState.CHECKED:
        if (!isModelOnly) {
          this.checkbox.nativeElement.checked = true;
        }

        this._state = CheckboxState.CHECKED;

        break;
      case CheckboxState.INDETERMINATE:
        if (!isModelOnly) {
          this.checkbox.nativeElement.indeterminate = true;
        }

        this._state = CheckboxState.INDETERMINATE;

        break;
      case !!value:
        if (!isModelOnly) {
          this.checkbox.nativeElement.checked = true;
        }

        this._state = CheckboxState.CHECKED;

        break;
      default:
        if (!isModelOnly) {
          this.checkbox.nativeElement.checked = false;
        }

        this._state = CheckboxState.UNCHECKED;

        break;
    }
  }

  writeValue(obj: any): void {
    this.setState(obj);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  /* tslint:disable no-empty */
  setDisabledState(): void {
  }

  /* tslint:enable no-empty */

  onBlur(): void {
    this._onTouched();
  }

  // call if value was changed inside our component
  /* tslint:disable no-empty */
  private _onChange = (_: any) => {
  };
  /* tslint:enable no-empty */

  // call if input was "touched" .. !
  /* tslint:disable no-empty */
  private _onTouched = () => {
  };
  /* tslint:enable no-empty */

}
