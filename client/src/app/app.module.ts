import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { API_BASE_URL } from './app.api';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { LoadersCssModule } from 'angular2-loaders-css';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LoadersCssModule
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    SitemapComponent
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
