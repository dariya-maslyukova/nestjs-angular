import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CONFIG } from '../app.config';
import { ApiService } from './api.service';
import { HomeSliderQuery } from '../interfaces/queries/home-slider-query.interface';
import { QueryType } from '../enums/query-type.enum';
import { HomeSlider } from '../interfaces/home-slider.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeSliderService {

  constructor(private as: ApiService) {
  }

  getList(query: HomeSliderQuery = {}): Observable<HomeSlider[]> {
    // query.type = QueryType.ALL;

    return this.getHomeSlider();
  }

  // getById(id: string | string[]): Observable<HomeSlider> {
  //   const query = {
  //     type: QueryType.BY_ID,
  //     query: { id },
  //   };
  //
  //   return this.getHomeSlider(query);
  // }

  private getHomeSlider(): Observable<HomeSlider[]> {
    return this.as.get<HomeSlider[]>(
      CONFIG.apiUrls.HomeSlider
    );
  }

}
