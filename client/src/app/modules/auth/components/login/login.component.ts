import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginVm, UserClient } from '../../../../app.api';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils.service';
import { EnumsService } from '../../../../services/enums.service';
import { emailValidator } from '../../../../validators/email.validator';
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
    private userClient: UserClient,
    private r: Router,
    private us: UtilsService,
    private uss: UserService,
    private es: EnumsService,
    private as: AuthService
  ) {
    this.form = this.fb.group(
      {
        Email: [ null, [ Validators.required, emailValidator ] ],
        Password: [null, Validators.required]
      },
    );
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    // this.us.removeError(this.form.controls['UserName'], 'invalid');

    if (this.form.invalid) {
      return this.us.validateAllFormFields(this.form);
    }

    this.isLoading = true;


    // const formData: LoginVm = new LoginVm(this.form.value);
    const formData = this.form.value;

    this.as
      .login(formData)
      .subscribe(user => {
          if (user.token) {
            this.uss.currentUser = user;
            this.r.navigate(['/auth/profile']);
          } else {
            this.isLoading = false;
            this.form
              .get('Email')
              .setErrors({ invalid: true });
            this.us.handleError(user);
          }

          return;
        }
      );
  }

}
