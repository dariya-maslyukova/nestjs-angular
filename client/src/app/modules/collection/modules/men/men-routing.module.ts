import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MenComponent } from './components/pages/men/men.component';
import { MenJacketsCoatsComponent } from './components/pages/men-jackets-coats/men-jackets-coats.component';

const routing: Routes = [
  {
    path: '', component: MenComponent,
    data: { state: 'men', breadcrumb: 'Men' },
    children: [
      {
        path: 'jackets-coats',
        component: MenJacketsCoatsComponent,
        data: { state: 'womenJacketsCoatsCategory' },
      },
    ],
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
  ],
  exports: [RouterModule],
})
export class MenRoutingModule {
}
