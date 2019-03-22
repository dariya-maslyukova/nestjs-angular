import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { IconsService } from './services/icons.service';
import { ToasterService } from 'angular2-toaster';
import { AuthorizedGuard } from './guards/authorized.guard';
import { SharedModule } from './shared/shared.module';
import { CollectionLayoutComponent } from './components/collection-layout/collection-layout.component';

export function appInitFactory(is: IconsService): Function {
  return () => Promise.all([
    is.loadSvgIcons(),
  ]);
}


// Adapter for window.localStorage
export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}

export function baseUrl(): string {
  return window.location.origin + '/api';
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    SitemapComponent,
    CollectionLayoutComponent
  ],
  providers: [
    ToasterService,
    AuthorizedGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      deps: [IconsService],
      multi: true,
    },
    { provide: 'API_BASE_URL', useFactory: baseUrl },
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },


  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
