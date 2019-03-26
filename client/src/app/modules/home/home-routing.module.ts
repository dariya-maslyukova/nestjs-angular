import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: HomeComponent,
      data: { state: 'home' },
    },
  ])],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
