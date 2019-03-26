import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FlexSliderModule } from '../../shared/components/flex-slider/flex-slider.module';
import { HomeRoutingModule } from './home-routing.module';
import { AnimateProductsSectionComponent } from './components/animate-products-section/animate-products-section.component';
import { OwlCarouselComponent } from '../../shared/components/owl-carousel/owl-carousel.component';
import { OverlayModule } from '../../shared/components/overlay/overlay.module';

@NgModule({
  declarations: [
    HomeComponent,
    AnimateProductsSectionComponent,
    OwlCarouselComponent
  ],
  imports: [
    CommonModule,
    FlexSliderModule,
    HomeRoutingModule,
    OverlayModule
  ]
})
export class HomeModule {
}
