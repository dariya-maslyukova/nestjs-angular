import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { RegisterVm, UserClient } from '../../../../app.api';
import { Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils.service';
import { EnumsService } from '../../../../services/enums.service';
import { emailValidator } from '../../../../validators/email.validator';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private as: AuthService,
    private uss: UserService,
  ) {
    this.form = this.fb.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [null, [Validators.required, emailValidator]],
        password: [null, Validators.required],
        phone: [null],
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
