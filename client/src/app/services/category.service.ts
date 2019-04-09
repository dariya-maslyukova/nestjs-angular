import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

import { ObjectClass } from '../enums/object-class.enum';
import { ProductsQuery } from '../interfaces/queries/products.query.interface';
import { DocsResponse } from '../interfaces/docs-response.interface';
import { Product } from '../interfaces/product/product.interface';
import { CONFIG } from '../app.config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  objectClass: ObjectClass;

  private _selectedCategoryProducts: DocsResponse<Product[]>;
  private selectedCategoryProductsSubject = new Subject<DocsResponse<Product[]>>();

  private _totalFoundProductsSubject = new Subject<number>();
  private _totalFoundProducts = 0;

  constructor(private as: ApiService) {

  }

  set selectedCategoryProducts(products: DocsResponse<Product[]>) {
    this._selectedCategoryProducts = products;
    this.selectedCategoryProductsSubject.next(products);
  }

  get selectedCategoryProducts(): DocsResponse<Product[]> {
    return this._selectedCategoryProducts;
  }

  get selectedCategoryProducts$(): Observable<DocsResponse<Product[]>> {
    return this.selectedCategoryProductsSubject.asObservable();
  }

  get totalFoundProducts(): number {
    return this._totalFoundProducts;
  }

  set totalFoundProducts(total: number) {
    this._totalFoundProducts = total;
    this._totalFoundProductsSubject.next(total);
  }

  get totalFoundProducts$(): Observable<number> {
    return this._totalFoundProductsSubject.asObservable();
  }

  currCategoryCleanup(): void {
    this.selectedCategoryProducts = null;
  }

  getList(query: ProductsQuery = {} as ProductsQuery): Observable<DocsResponse<Product[]>> {
    return this.getCategoryProducts(query);
  }


  private getCategoryProducts(query: ProductsQuery): Observable<DocsResponse<Product[]>> {
    return this.as.get<DocsResponse<Product[]>>(
      CONFIG.apiUrls.Products,
      query,
    );
  }

}
