import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { emailValidator } from '../../../../validators/email.validator';
import { UtilsService } from '../../../../services/utils.service';
import { EnumsService } from '../../../../services/enums.service';
import { AuthService } from '../../../../services/auth.service';
import { ConfirmPasswordValidator } from '../../../../validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnDestroy {

  form: FormGroup;
  isLoading = false;


  private destroyedSubject = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private r: Router,
    private us: UtilsService,
    private es: EnumsService,
    private as: AuthService,
  ) {
    this.form = this.fb.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [null, [Validators.required, emailValidator]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, Validators.required],
        phone: [null],
      }, {
        validator: ConfirmPasswordValidator.MatchPassword,
      },
    );
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.form.invalid) {
      return this.us.validateAllFormFields(this.form);
    }

    this.isLoading = true;

    const formData = {
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      phone: this.form.get('phone').value,
    };


    this.as
      .register(formData)
      .subscribe(data => {
          if (data.success) {
            this.r.navigate(['/auth']);
          } else {
            this.isLoading = false;
            this.form
              .get('email')
              .setErrors({ invalid: true });
            this.us.handleError(data);
          }

          return;
        },
      );
  }

}
