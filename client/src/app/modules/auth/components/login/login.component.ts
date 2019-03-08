import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { emailValidator } from '../../../../validators/email.validator';
import { UtilsService } from '../../../../services/utils.service';
import { EnumsService } from '../../../../services/enums.service';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnDestroy {

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
        email: [null, [Validators.required, emailValidator]],
        password: [null, Validators.required],
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

    const formData = this.form.value;

    this.as
      .login(formData)
      .subscribe(data => {
          if (data.token) {
            this.uss.currentUser = data.user;
            localStorage.setItem('token', data.token);
            this.r.navigate(['/profile']);
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
