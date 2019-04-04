import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

import { ApiService } from './api.service';
import { CONFIG } from '../app.config';
import { Product } from '../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _selectedProduct: Product;
  private selectedProductSubject = new Subject<Product>();

  constructor(private as: ApiService) {
  }

  getBySKU(sku: string): Observable<Product> {
    return this.getProductBySku(sku);
  }

  set selectedProduct(product) {
    this._selectedProduct = product;
    this.selectedProductSubject.next(product);
  }

  get selectedProduct(): Product {
    return this._selectedProduct;
  }

  get selectedProduct$(): Observable<Product> {
    return this.selectedProductSubject.asObservable();
  }

  currProductCleanup(): void {
    this.selectedProduct = null;
  }


  private getProductBySku(sku?: string): Observable<Product> {
    return this.as.getByParameterFromURL<Product>(
      CONFIG.apiUrls.Products,
      sku
    );
  }

}
