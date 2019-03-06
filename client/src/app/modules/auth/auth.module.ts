import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthorizedGuard } from '../../guards/authorized.guard';


// Adapter for window.localStorage
export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AuthWrapperComponent,
    ForgotPasswordComponent,
    PrivacyPolicyComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthorizedGuard,
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
  ]
})
export class AuthModule { }
