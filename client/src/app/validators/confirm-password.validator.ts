import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {

  static MatchPassword(control: AbstractControl): void {
    const password = control.get('Password').value;
    const confirmPassword = control.get('ConfirmPassword').value;

    if (password !== confirmPassword) {
      control.get('ConfirmPassword').setErrors({ConfirmPassword: true});
    } else {
      return null;
    }
  }

}
