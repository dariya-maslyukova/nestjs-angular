import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SitemapComponent } from './components/sitemap/sitemap.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: './modules/main/main.module#MainModule' },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'sitemap', component: SitemapComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
