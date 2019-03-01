import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'new',
    // loadChildren: './modules/women/women.module#WomenModule',
    data: {
      state: 'new'
    }
  },
  {
    path: 'women',
    // loadChildren: './modules/women/women.module#WomenModule',
    data: {
      state: 'women'
    }
  },
  {
    path: 'men',
    // loadChildren: './modules/women/women.module#MenModule',
    data: {
      state: 'men'
    }
  },
  {
    path: 'sale',
    // loadChildren: './modules/women/women.module#MenModule',
    data: {
      state: 'sale'
    }
  },
  {
    path: 'contact',
    // loadChildren: './modules/women/women.module#MenModule',
    data: {
      state: 'contact'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class MainRoutingModule {
}
