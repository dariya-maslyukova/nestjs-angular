import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnumValue } from '../interfaces/enum-value.interface';
import { Enums } from '../enums/enums.enum';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  private _enumsValueMap: { [E in Enums]: EnumValue[] };

  constructor(

  ) {
  }


  // loadEnumValues(): Promise<void> {
  //   this.getFromLocalStorage();
  //
  //   // TODO: we need to load updated values somehow. Maybe load them each time when application loads
  //   if (!this._enumsValueMap || environment.production) {
  //     const requestsMap: {[E in Enums]: ApiCallAggregatorQuery<EnumQuery>}
  //       = {} as {[E in Enums]: ApiCallAggregatorQuery<EnumQuery>};
  //
  //     Object
  //       .values(Enums)
  //       .forEach((e: Enums) => {
  //         requestsMap[e] = { service: e, params: { environment: environment.apiEnvironment } };
  //       });
  //
  //     return new Promise(resolve => {
  //       this.as
  //         .post<{ [E in Enums]: EnumResponse }>(CONFIG.apiUrls.ApiCallAggregator, requestsMap)
  //         .subscribe(
  //           responsesMap => {
  //             const enumValueMap: { [E in Enums]: EnumValue[] } = {} as { [E in Enums]: EnumValue[] };
  //
  //             Object
  //               .keys(responsesMap)
  //               .forEach(key => {
  //                 enumValueMap[key] = responsesMap[key].results;
  //               });
  //
  //             this._enumsValueMap = enumValueMap;
  //             this.saveToLocalStorage();
  //             resolve();
  //           },
  //           (errorResponse: HttpErrorResponse) => {
  //             if (typeof errorResponse.error === 'object') {
  //               // TODO: Add proper error text and check for error type
  //               // TODO: Also implement interface to describe error response from API
  //               // this.ts.pop('error', '', errorResponse.body['errorDetails'][0]);
  //               const queryPartError = Object.values(errorResponse.error).shift();
  //
  //               if (queryPartError
  //                 && 'errorDetails' in queryPartError
  //                 && queryPartError['errorDetails'][0] === 'Not Authorised for: *'
  //               ) {
  //                 this.us.currentUser = null;
  //                 // Can't do with Router because APP_INITIALIZER executes earlier than Router init
  //                 // this.r.navigate([environment.loginUrl]);
  //                 location.href = `#${environment.loginUrl}`;
  //                 resolve();
  //               }
  //             }
  //           }
  //         );
  //     });
  //   } else {
  //     return Promise.resolve();
  //   }
  // }

  getEnumValues(e: Enums): EnumValue[] {
    return this._enumsValueMap[e];
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('enumMap', JSON.stringify(this._enumsValueMap));
  }

  private getFromLocalStorage(): void {
    this._enumsValueMap = JSON.parse(localStorage.getItem('enumMap'));
  }

}
