import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { API_BASE_URL } from './app.api';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: API_BASE_URL, useFactory: baseUrl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function baseUrl(): string {
  return window.location.origin + '/api';
}
