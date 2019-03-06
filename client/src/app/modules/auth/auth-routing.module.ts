import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthorizedGuard } from '../../guards/authorized.guard';

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
  },
  {
    path: 'profile',
    loadChildren: './modules/profile/profile.module#ProfileModule',
    canActivate: [AuthorizedGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
