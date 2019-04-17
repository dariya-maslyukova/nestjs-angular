import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavItem } from '../../interfaces/nav/nav-item.interface';
import { emailValidator } from '../../validators/email.validator';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  navItems: NavItem[] = [
    {
      label: 'Deliveries',
      route: '/deliveries',
    },
    {
      label: 'Returns',
      route: '/returns',
    },
    {
      label: 'Terms and conditions',
      route: '/terms-conditions',
    },
    {
      label: 'Affiliate Program',
      route: '/affiliate-program',
    },
    {
      label: 'Contact Us',
      route: '/contact',
    },
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private us: UtilsService
  ) {

    this.form = this.fb.group({
      Email: [
        null,
        [
          Validators.required,
          emailValidator,
        ],
      ],
    });
  }

  ngOnInit() {
  }

  onSubmit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (!this.form.valid) {
      return this.us.validateAllFormFields(this.form);
    }
  }


}
