import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

import { ApiService } from './api.service';
import { CONFIG } from '../app.config';
import { Product } from '../interfaces/product/product.interface';
import { ProductsQuery } from '../interfaces/queries/products.query.interface';
import { DocsResponse } from '../interfaces/docs-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _selectedProduct: Product;
  private selectedProductSubject = new Subject<Product>();

  constructor(private as: ApiService) {
  }

  getList(query: ProductsQuery = {} as ProductsQuery): Observable<DocsResponse<Product>> {
    return this.getProducts(query);
  }

  getById(id: string | string[]): Observable<DocsResponse<Product>> {
    const query: ProductsQuery = {
      query: { id },
    };

    return this.getProducts(query);
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

  private getProducts(query: ProductsQuery): Observable<DocsResponse<Product>> {
    return this.as.post<DocsResponse<Product>>(
      CONFIG.apiUrls.Products,
      query
    );
  }

}
