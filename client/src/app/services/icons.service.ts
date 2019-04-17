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
    { url: '/assets/images/icons/user.svg', name: 'user' },
    { url: '/assets/images/icons/heart.svg', name: 'heart' },
    { url: '/assets/images/icons/heart-black.svg', name: 'heart-black' },
    { url: '/assets/images/icons/social/facebook.svg', name: 'facebook' },
    { url: '/assets/images/icons/social/instagram.svg', name: 'instagram' },
    { url: '/assets/images/icons/social/google.svg', name: 'google' },
    { url: '/assets/images/icons/social/twitter.svg', name: 'twitter' },
    { url: '/assets/images/icons/trash.svg', name: 'trash' },
    { url: '/assets/images/arrow-right.svg', name: 'arrow-right' },
    { url: '/assets/images/arrow-left.svg', name: 'arrow-left' },
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
