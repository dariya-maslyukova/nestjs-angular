import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(environment.apiUrl + url, { params });
  }

  post<T>(url: string, body?: any): Observable<T> {
    return this.httpClient.post<T>(environment.apiUrl + url, body);
  }

  put<T>(url: string, body?: any): Observable<T> {
    return this.httpClient.patch<T>(environment.apiUrl + url, body);
  }

  delete<T>(url: string, params?: HttpParams): Observable<T> {
    return this.httpClient.delete<T>(environment.apiUrl + url, { params });
  }

  postBlobRequest(url: string, body?: any): Observable<any> {
    return this.httpClient.post(
      environment.apiUrl + url,
      body,
      {
        responseType: 'blob',
        observe: 'response' // When this is not defined, it will directly return only BLOB
      }
    );
  }
}
