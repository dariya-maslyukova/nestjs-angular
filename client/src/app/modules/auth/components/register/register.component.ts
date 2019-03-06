import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { RegisterVm, UserClient } from '../../../../app.api';
import { Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils.service';
import { EnumsService } from '../../../../services/enums.service';
import { emailValidator } from '../../../../validators/email.validator';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnDestroy {

  form: FormGroup;
  isLoading = false;

  private destroyedSubject = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private userClient: UserClient,
    private r: Router,
    private us: UtilsService,
    private es: EnumsService,
    private as: AuthService
  ) {
    this.form = this.fb.group(
      {
        FirstName: null,
        LastName: null,
        Email: [ null, [ Validators.required, emailValidator ] ],
        Password: [null, Validators.required],
        PhoneNumber: [null],
      }
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

    // const formData: RegisterVm = new RegisterVm(this.form.value);
    const formData = this.form.value;

    console.log(formData);

    // this.userClient
    //   .register(formData)
    this.as
      .register(formData)
      .subscribe(response => {
          console.log(response);

          if (response) {
            this.r.navigate(['/auth/login']);
          } else {
            this.isLoading = false;
            this.form
              .get('Email')
              .setErrors({ invalid: true });
            this.us.handleError(response);
          }

          return;
        }
      );
  }

}
