import { Component, ContentChild, forwardRef, Input, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControlName, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Subject } from 'rxjs';

import { CONFIG } from '../../../app.config';

@Component({
  selector: 'app-mat-control',
  templateUrl: './mat-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatControlComponent),
      multi: true,
    },
  ],
})
export class MatControlComponent implements ControlValueAccessor, OnDestroy {

  @Input() errorMap;
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeholder: string;
  @Input() autocomplete;
  @ContentChild(FormControlName) fcn: FormControlName;

  hasError = false;

  onChange: Function;
  onTouche: Function;

  autocompleteChoices;

  private destroyedSubject = new Subject<void>();
  private _value: any = null;


  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }

  writeValue(value: any) {
    if (!this.autocomplete) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouche = fn;
  }

  displayText(value): string {
    return value.text;
  }

  autocompleteHandler(event: Event) {
    const text = (<HTMLInputElement>event.target).value;
    if (this.autocomplete) {
      if (text) {
        this.autocompleteChoices = this.autocomplete(text);
      } else if (this.onChange) {
        this.value = '';
        this.onChange(null);
      }
    }
  }

  autocompleteBlur(event: Event) {
    (<HTMLInputElement>event.target).value = this.value;
    this.onTouche();
  }

  updateOption(event: MatAutocompleteSelectedEvent) {
    if (this.onChange) {
      const { value, text } = event.option.value;
      this.value = text;
      this.onChange(value);
    }
  }

  getError(): string {
    const errors = this.fcn.control.errors;
    let error = '';

    if (errors) {
      Object
        .keys(errors)
        .some(errorKey => {
          if (errors[errorKey]) {
            error = this.errorMap
              ? this.errorMap[errorKey]
                ? this.errorMap[errorKey]
                : CONFIG.errorMessages[errorKey]
              : CONFIG.errorMessages[errorKey];

            return true;
          }
        });
      return error;
    }

    if (error) {
      this.hasError = true;
    }

  }

  get control(): AbstractControl {
    return this.fcn.control;
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
