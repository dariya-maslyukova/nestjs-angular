import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { LoginVm, RegisterVm, UserClient } from '../../../../app.api';
import { Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils.service';
import { EnumsService } from '../../../../services/enums.service';
import { ConfirmPasswordValidator } from '../../../../validators/confirm-password.validator';
import { emailValidator } from '../../../../validators/email.validator';

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
    private es: EnumsService
  ) {
    this.form = this.fb.group(
      {
        FirstName: null,
        LastName: null,
        UserName: [null, Validators.required],
        Email: [ null, [ Validators.required, emailValidator ] ],
        Password: [null, Validators.required],
        ConfirmPassword: [null, Validators.required],
        PhoneNumber: [null],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword
      }
    );
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  onSubmit(event?: Event): void {
    event.preventDefault();

    if (this.form.invalid) {
      return this.us.validateAllFormFields(this.form);
    }

    this.isLoading = true;

    const formData: LoginVm = new RegisterVm(this.form.value);

    this.userClient
      .register(formData)
      .subscribe(response => {
          console.log(response);

          if (response) {
            this.r.navigate(['/login']);
          } else {
            this.isLoading = false;
            this.form
              .get('userName')
              .setErrors({ invalid: true });
            this.us.handleError(response);
          }

          return;
        }
      );
  }

}
