import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group(
      {
        username: [null, Validators.required],
        password: [null, Validators.required],
        keepLoggedin: [null],
      },
    );
  }

  ngOnInit() {
  }

  onSubmit(event: Event): void {
    event.preventDefault();
  }

}
