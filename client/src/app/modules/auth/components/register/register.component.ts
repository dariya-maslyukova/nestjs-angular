import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { emailValidator } from '../../../../validators/email.validator';
import { UtilsService } from '../../../../services/utils.service';
import { EnumsService } from '../../../../services/enums.service';
import { AuthService } from '../../../../services/auth.service';
import { ConfirmPasswordValidator } from '../../../../validators/confirm-password.validator';
import { UserService } from '../../../../services/user.service';

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
    private uss: UserService,
    private es: EnumsService,
    private as: AuthService,
  ) {
    this.form = this.fb.group(
      {
        FirstName: [null, Validators.required],
        LastName: [null, Validators.required],
        Email: [null, [Validators.required, emailValidator]],
        Password: [null, [Validators.required, Validators.minLength(6)]],
        ConfirmPassword: [null, Validators.required],
        Phone: [null],
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
      FirstName: this.form.get('FirstName').value,
      LastName: this.form.get('LastName').value,
      Email: this.form.get('Email').value,
      Password: this.form.get('Password').value,
      Phone: this.form.get('Phone').value,
    };


    this.as
      .register(formData)
      .subscribe(data => {
          if (data.success) {
            this.uss.currentUser = data.user;
            this.r.navigate(['/profile']);
          } else {
            this.isLoading = false;
            this.form
              .get('Email')
              .setErrors({ invalid: true });
            this.us.handleError(data);
          }

          return;
        },
      );
  }

}
