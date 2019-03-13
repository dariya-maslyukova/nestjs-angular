import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { cloneDeep, get, mergeWith } from 'lodash';
import { diff } from 'deep-diff';

import { environment } from '../../environments/environment';
import { Model } from '../interfaces/model.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /** ObjectID has structure ID:00000. So yeah ¯\_(ツ)_/¯ */
  getId(data: Model | string): string {
    const id = typeof data === 'object' ? data.id : data;

    return id.split(':')[ 1 ];
  }

  /** ObjectID can be ID:00000 or NEW:00000 in case of new object creation */
  isDbId(data: Model | string): boolean {
    const id = typeof data === 'object' ? data.id : data;

    return id.split(':')[ 0 ] !== 'NEW';
  }

  makeDbID(id: string | number): string {
    id = `${id}`;

    return id.startsWith('ID:') ? id : `ID:${id}`;
  }

  handleError(e): void {
    let errorMsgs: any[];

    if (e instanceof HttpErrorResponse && e.error) {

      if (e.error instanceof Error) {
        errorMsgs = [ e.error ];
      } else if (e.error.errorDetails) {
        errorMsgs = e.error.errorDetails;
      }
    } else if (e.oneITMessages) {   // Can't check instanceof OneITError here, strange!!!
      errorMsgs = e.oneITMessages;
    }

    if (!errorMsgs) {
      errorMsgs = [ e ];
    }

    if (!environment.production) {
      console.info(errorMsgs);
    }
  }

  mapArrayToReferences(items: Model[]): any {
    const obj = {};

    items.forEach(item => {
      obj[ item.id ] = item;
    });

    return obj;
  }

  deepCopy(obj: any): any {
    return cloneDeep(obj);
  }

  objDiff(source, compare): any {
    return diff(source, compare);
  }

  cleanupEmptyNestedObjects(obj: any): any {
    const copy = this.deepCopy(obj);

    const runner = (data: any): void => {
      if (typeof data !== 'object') {
        return;
      }

      Object
        .keys(data)
        .forEach((attrKey: any) => {
          const attrValue: Model | any = data[ attrKey ];
          // Check if attribute value is of `Model` type
          if (attrValue && typeof attrValue === 'object' && attrValue.hasOwnProperty('ObjectID')) {
            runner(attrValue);

            if (!attrValue.ObjectID) {
              data[ attrKey ] = attrValue.ObjectID;
            }
          } else if (Array.isArray(attrValue)) {
            attrValue.forEach(
              (item: any) => {
                runner(item);
              }
            );
          }
        });
    };

    runner(copy);

    return copy;
  }

  patchFormValue(form: FormGroup, value: any): void {
    const runner = (data: any, currPath: string[] = []) => {
      const currData = currPath.length ? get(value, currPath) : data;

      Object
        .keys(currData)
        .forEach(attrKey => {
          const attrValue = currData[ attrKey ];

          if (
            attrValue
            && typeof attrValue === 'object'
            && !Array.isArray(attrValue)
            && !attrValue.hasOwnProperty('URI') /* In case when we have logo object ¯\_(ツ)_/¯ */
          ) {
            runner(attrValue, currPath.concat([ attrKey ]));

            return;
          }

          if (attrValue === null || attrValue === undefined) {
            return;
          }

          const field: AbstractControl = form.get(currPath.concat([ attrKey ]).join('.'));

          if (!field) {
            return;
          }

          (field as FormControl).patchValue(attrValue);

        });
    };

    runner(value);
  }

  validateAllFormFields(formGroup?: FormGroup): void {
    Object
      .keys(formGroup.controls)
      .forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsDirty({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
  }

  mergeObjects(source: Model, data: object): Model {
    return mergeWith(
      this.deepCopy(source),
      data,
      // @ts-ignore
      (objValue, srcValue) => {
        // Because we need not to merge array but replace destination by src
        if (Array.isArray(srcValue)) {
          return srcValue;
        }
      }
    );
  }

  isLinkActive(url, router): boolean {
    const markPos = router.url.indexOf('?');
    const cleanUrl = markPos !== -1 ? router.url.slice(0, markPos) : router.url;

    return cleanUrl === url;
  }

  /**
   * This function will combine result with references. Update references etc.
   * So final output will have ALL assoc objects set.
   */
  convertResponseToObjects(data, assocs: any[]): any[] {
    const result: any[] = [];
    let record: any = {};
    for (const i in data.results) {
      if (data.results.hasOwnProperty(i)) {
        record = data.references[ data.results[ i ] ];

        if (assocs) {
          this.updateReferences(record, assocs, data.references, 0);
        }
        result.push(record);
      }
    }

    return result;
  }

  updateReferences(obj: any, origAssocs: string[], references, index: number): void {
    const assocs = this.getAssocsForIndex(origAssocs, index);
    for (const assoc of assocs) {
      if (obj[ assoc ]) {
        if (typeof obj[ assoc ] === 'string') {
          if (references[ obj[ assoc ] ]) {
            this.updateReferences(references[ obj[ assoc ] ], origAssocs, references, index + 1);
            obj[ assoc ] = references[ obj[ assoc ] ];
          }
        } else if (Array.isArray(obj[ assoc ])) {
          const multiAssocs = [];

          for (const assocObj of obj[ assoc ]) {
            if (typeof assocObj === 'string') {
              if (references[ assocObj ]) {
                this.updateReferences(references[ assocObj ], origAssocs, references, index + 1);
                multiAssocs.push(references[ assocObj ]);
              }
            } else {
              multiAssocs.push(assocObj);
            }
          }
          obj[ assoc ] = multiAssocs;
        }
      }
    }
  }

  /**
   * This function will return valid Assoc names from original assocs array supplied.
   * e.g. input assocs:  ["PostcodeSuburb", "PriceList.BaseCosts", "PriceList.ExtraCosts"]
   *      output: for index 0 ["PostcodeSuburb", "PriceList"]
   *              for index 1 ["BaseCosts", "ExtraCosts"]
   */
  getAssocsForIndex(assocs: string[], index: number): string[] {
    const finalAssocs: Set<string> = new Set();
    for (const assoc of assocs) {

      const splittedAssocs: string[] = assoc.split('.');

      if (splittedAssocs.length > index) {
        finalAssocs.add(splittedAssocs[ index ]);
      }
    }

    return Array.from(finalAssocs.values());
  }

  removeError(control: AbstractControl, error: string): void {
    const err = control.errors; // get control errors
    if (err) {
      // tslint:disable-next-line:no-dynamic-delete
      delete err[error]; // delete your own error
      if (!Object.keys(err).length) { // if no errors left
        control.setErrors(null); // set control errors to null making it VALID
      } else {
        control.setErrors(err); // controls got other errors so set them back
      }
    }
  }

  getGeneratedId(): string {
    return `_${Math.random().toString(36).substr(2, 9)}`;
  }

}
