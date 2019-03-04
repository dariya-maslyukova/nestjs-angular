import { Injectable } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class IconsService {

  icons = [
    { url: '/assets/images/icons/search.svg', name: 'search' },
    { url: '/assets/images/icons/error.svg', name: 'error' },
  ];

  constructor(private iconReg: SvgIconRegistryService) {

  }

  loadSvgIcons(): Promise<any> {

    return new Promise<any>(resolve => {
      forkJoin(
        this.icons.map(icon => {
          return this.iconReg.loadSvg(icon.url, icon.name).pipe(retry(3));
        })
      ).subscribe(() => {
        resolve();
      });
    });
  }

}
