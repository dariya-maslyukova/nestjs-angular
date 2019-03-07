import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SitemapComponent } from './components/sitemap/sitemap.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthorizedGuard } from './guards/authorized.guard';

const routes: Routes = [
  { path: '', loadChildren: './modules/main/main.module#MainModule' },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule', canActivate: [AuthorizedGuard] },
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
