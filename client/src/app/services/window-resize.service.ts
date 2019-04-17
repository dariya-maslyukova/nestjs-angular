import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BoxSize } from '../interfaces/box-size.interface';

@Injectable({
  providedIn: 'root',
})
export class WindowResizeService {

  private resizedSubject = new BehaviorSubject<BoxSize>(
    {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  );

  constructor(private z: NgZone) {
    const self = this;

    self.z.runOutsideAngular(() => {
      window.addEventListener(
        'resize',
        event => {
          self.z.run(() => {
            // Says that event was triggered by window native resize, not triggered from code
            if (event.isTrusted) {
              self.resizedSubject.next(
                {
                  width: window.innerWidth,
                  height: window.innerHeight,
                },
              );
            }
          });
        },
      );
    });
  }

  get resized$(): Observable<BoxSize> {
    return this.resizedSubject.asObservable();
  }

  triggerCheck(): void {
    return this.resizedSubject.next({ width: window.innerWidth, height: innerHeight });
  }
}
