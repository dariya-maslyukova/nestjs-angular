import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ObjectClass } from '../../../enums/object-class.enum';
import { UtilsService } from '../../../services/utils.service';
import { WindowResizeService } from '../../../services/window-resize.service';
import { Product } from '../../../interfaces/product/product.interface';

@Component({
  selector: 'app-owl-carousel',
  templateUrl: './owl-carousel.component.html',
})
export class OwlCarouselComponent implements OnInit, AfterViewInit {

  slides: Product[] = [];

  options: any = {
    loop: true,
    slideTransition: 'ease-out',
    items: 2,
    slideBy: 2,
    navSpeed: 500,
    smartSpeed: 500,
    nav: true,
    autoplay: false,
    dots: false,
    navText: [
      '<i class="icon icon__arrow-left"></i>',
      '<i class="icon icon__arrow-right"></i>',
    ],
  };

  @ViewChild('owlCarousel') owlCarousel;

  private destroyedSubject = new Subject<void>();

  constructor(
    private cs: CategoryService,
    private us: UtilsService,
    private wrs: WindowResizeService,
  ) {
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {

    this.wrs
      .resized$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(() => {
        this.owlCarousel.reInit();
      });

    this.cs
      .getList({
        limit: 6,
      })
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(response => {
        this.slides = response.docs;
      });
  }

  getDetailsUrl(objectClass: ObjectClass, sku: string) {
    const routesMap = {
      [ObjectClass.WomenProducts]: '/collection/women/product',
      [ObjectClass.MenProducts]: '/collection/men/product',
    };

    const mapUrl = routesMap[objectClass];
    return `${mapUrl}/${this.us.getProductSKU(sku)}`;
  }


}
