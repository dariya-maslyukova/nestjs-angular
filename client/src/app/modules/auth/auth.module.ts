import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadersCssModule } from 'angular2-loaders-css';


import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    LoadersCssModule
  ],
  declarations: [
    AuthWrapperComponent,
    ForgotPasswordComponent,
    PrivacyPolicyComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
