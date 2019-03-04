import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginVm, UserClient } from '../../../../app.api';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils.service';
import { EnumsService } from '../../../../services/enums.service';

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
    private es: EnumsService
  ) {
    this.form = this.fb.group(
      {
        UserName: [null, Validators.required],
        Password: [null, Validators.required],
        keepLoggedin: [null],
      },
    );
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  onSubmit(event?: Event): void {
    event.preventDefault();

    this.us.removeError(this.form.controls['UserName'], 'invalid');

    if (this.form.invalid) {
      return this.us.validateAllFormFields(this.form);
    }

    this.isLoading = true;

    const formData: LoginVm = new LoginVm(this.form.value);
    // formData['keepLoggedin'] = formData['keepLoggedin'] === null ? false : formData['keepLoggedin'];

    this.userClient
      .login(formData)
      .subscribe(response => {
        console.log(response);

        if (response.user) {
            // this.es
            //   .loadEnumValues()
            //   .then(() => this.r.navigate(['/profile']));
          this.r.navigate(['/profile']);
          } else {
            this.isLoading = false;
            this.form
              .get('UserName')
              .setErrors({ invalid: true });
            this.us.handleError(response);
          }

          return;
        }
      );
  }

}
