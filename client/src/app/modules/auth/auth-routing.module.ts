import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserService } from '../../services/user.service';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthWrapperComponent,
  },
  {
    path: 'registration',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [
    UserService
  ]
})
export class AuthRoutingModule {
}
