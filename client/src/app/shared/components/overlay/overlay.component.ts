import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  animations: [
    trigger(
      'fadeInOut',
      [
        state(
          'in',
          style({ transform: 'translateX(0)' })
        ),
        transition(
          'void => *',
          [
            animate(
              200,
              style({ opacity: '1' })
            )
          ]
        ),
        transition(
          '* => void',
          [
            animate(
              200,
              style({ opacity: '0' })
            )
          ]
        )
      ]
    )
  ]
})
export class OverlayComponent {

  @Input() text = '';
  @Input() isActive = false;

}
