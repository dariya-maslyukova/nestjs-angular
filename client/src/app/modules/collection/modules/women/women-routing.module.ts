import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WomenComponent } from './pages/women/women.component';
import { WomenLayoutComponent } from './components/women-layout/women-layout.component';
import { WomenCategoryComponent } from './pages/women-category/women-category.component';
import { WomenDressesComponent } from './pages/women-dresses/women-dresses.component';
import { WomenSkirtsComponent } from './pages/women-skirts/women-skirts.component';
import { WomenTShirtsComponent } from './pages/women-t-shirts/women-t-shirts.component';
import { WomenTrousersJeansComponent } from './pages/women-trousers-jeans/women-trousers-jeans.component';
import { WomenLeggingsComponent } from './pages/women-leggings/women-leggings.component';
import { WomenLingerieComponent } from './pages/women-lingerie/women-lingerie.component';
import { WomenShortsComponent } from './pages/women-shorts/women-shorts.component';
import { WomenJacketsCoatsComponent } from './pages/women-jackets-coats/women-jackets-coats.component';
import { WomenKnitwearComponent } from './pages/women-knitwear/women-knitwear.component';
import { WomenGymComponent } from './pages/women-gym/women-gym.component';
import { WomenBeachwearComponent } from './pages/women-beachwear/women-beachwear.component';
import { WomenBlousesTopsComponent } from './pages/women-blouses-tops/women-blouses-tops.component';

const routing: Routes = [
  {
    path: '', component: WomenComponent, data: { state: 'women' }
  },
  {
    path: 'populars', component: WomenLayoutComponent,
    data: { state: 'womenCategory' },
    children: [
      {
        path: '',
        component: WomenCategoryComponent,
        data: { state: 'womenCategory' }
      },
      {
        path: 'dresses',
        component: WomenDressesComponent,
        data: { state: 'womenDressesCategory' }
      },
      {
        path: 'skirts',
        component: WomenSkirtsComponent,
        data: { state: 'womenSkirtsCategory' }
      },
      {
        path: 't-shirts',
        component: WomenTShirtsComponent,
        data: { state: 'womenTShirtsCategory' }
      },
      {
        path: 'blouses-tops',
        component: WomenBlousesTopsComponent,
        data: { state: 'womenTopsCategory' }
      },
      {
        path: 'trousers-jeans',
        component: WomenTrousersJeansComponent,
        data: { state: 'womenTrousersJeansCategory' }
      },
      {
        path: 'leggings',
        component: WomenLeggingsComponent,
        data: { state: 'womenLeggingsCategory' }
      },
      {
        path: 'lingerie',
        component: WomenLingerieComponent,
        data: { state: 'womenLingerieCategory' }
      },
      {
        path: 'shorts',
        component: WomenShortsComponent,
        data: { state: 'womenShortsCategory' }
      },
      {
        path: 'knitwear',
        component: WomenKnitwearComponent,
        data: { state: 'womenKnitwearCategory' }
      },
      {
        path: 'jackets-coats',
        component: WomenJacketsCoatsComponent,
        data: { state: 'womenJacketsCoatsCategory' }
      },
      {
        path: 'gym',
        component: WomenGymComponent,
        data: { state: 'womenGymCategory' }
      },
      {
        path: 'beachwear',
        component: WomenBeachwearComponent,
        data: { state: 'womenBeachwearCategory' }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing)
  ],
  exports: [ RouterModule ]
})
export class WomenRoutingModule {
}
