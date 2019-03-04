import {
  Component,
  ContentChild,
  Input
} from '@angular/core';
import { AbstractControl, FormControlName } from '@angular/forms';

import { FocusBlurDirective } from '../../directives/focus-blur/focus-blur.directive';
import { CONFIG } from '../../../app.config';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html'
})
export class FormControlComponent {

  @Input() errorMap;
  @Input() fromParentClass = '';
  @ContentChild(FormControlName) fcn: FormControlName;
  @ContentChild(FocusBlurDirective) focusBlur: FocusBlurDirective;

  getError(): string {
    const errors = this.fcn.control.errors;
    let error = '';

    Object
      .keys(errors)
      .some(errorKey => {
        if (errors[ errorKey ]) {
          error = this.errorMap
            ? this.errorMap[ errorKey ]
              ? this.errorMap[ errorKey ]
              : CONFIG.errorMessages[ errorKey ]
            : CONFIG.errorMessages[ errorKey ];

          return true;
        }
      });

    return error;
  }

  get control(): AbstractControl {
    return this.fcn.control;
  }

  get isHighlighted(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get isShowErrorTooltip(): boolean {
    if (!this.focusBlur) {
      return;
    }

    return this.control.invalid && this.focusBlur.isFocused;
  }

}
