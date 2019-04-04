import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule, CarouselModule } from 'ngx-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { WomenFiltersComponent } from './components/women-filters/women-filters.component';
import { WomenLayoutComponent } from './components/women-layout/women-layout.component';
import { WomenComponent } from './pages/women/women.component';
import { WomenDressesComponent } from './pages/women-dresses/women-dresses.component';
import { WomenSkirtsComponent } from './pages/women-skirts/women-skirts.component';
import { WomenBlousesTopsComponent } from './pages/women-blouses-tops/women-blouses-tops.component';
import { WomenTShirtsComponent } from './pages/women-t-shirts/women-t-shirts.component';
import { WomenKnitwearComponent } from './pages/women-knitwear/women-knitwear.component';
import { WomenTrousersJeansComponent } from './pages/women-trousers-jeans/women-trousers-jeans.component';
import { WomenShortsComponent } from './pages/women-shorts/women-shorts.component';
import { WomenLeggingsComponent } from './pages/women-leggings/women-leggings.component';
import { WomenJacketsCoatsComponent } from './pages/women-jackets-coats/women-jackets-coats.component';
import { WomenLingerieComponent } from './pages/women-lingerie/women-lingerie.component';
import { WomenBeachwearComponent } from './pages/women-beachwear/women-beachwear.component';
import { WomenSweatshirtsComponent } from './pages/women-sweatshirts/women-sweatshirts.component';
import { WomenGymComponent } from './pages/women-gym/women-gym.component';
import { WomenCategoryComponent } from './pages/women-category/women-category.component';
import { WomenRoutingModule } from './women-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatSelectModule } from '@angular/material';
import { ProductComponent } from '../../components/product/product.component';
import { ProductLayoutComponent } from '../../components/product/product-layout/product-layout.component';

const COMPONENTS = [
  WomenFiltersComponent,
  WomenLayoutComponent,
  WomenComponent,
  WomenDressesComponent,
  WomenSkirtsComponent,
  WomenBlousesTopsComponent,
  WomenTShirtsComponent,
  WomenKnitwearComponent,
  WomenTrousersJeansComponent,
  WomenShortsComponent,
  WomenLeggingsComponent,
  WomenJacketsCoatsComponent,
  WomenLingerieComponent,
  WomenBeachwearComponent,
  WomenSweatshirtsComponent,
  WomenGymComponent,
  WomenCategoryComponent,
  ProductComponent,
  ProductLayoutComponent
];


@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    WomenRoutingModule,
    AngularSvgIconModule,
    SharedModule,
    CarouselModule.forRoot()
  ],
  declarations: [
    [...COMPONENTS],
  ],
  exports: [
    [...COMPONENTS],
  ],
})
export class WomenModule {
}
