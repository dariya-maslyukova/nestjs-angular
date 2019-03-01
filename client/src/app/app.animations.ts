import { animate, group, query, state, style, transition, trigger } from '@angular/animations';

// TODO: refactor this later
export const DROPDOWN_ANIMATIONS = [
  trigger('dropdownEnterLeave', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ opacity: '0' }),
      animate(200)
    ]),
    transition('* => void', [
      animate(200, style({ opacity: '1' }))
    ])
  ]),
  trigger('dropdownFadeInOut',
    [
      state('open', style({
        opacity: '1',
        visibility: 'visible'
      })),
      state('closed', style({
        opacity: '0',
        visibility: 'hidden'
      })),
      transition('closed => open', animate('200ms linear')),
      transition('open => closed', animate('200ms linear'))
    ]
  )
];

export function routeTransitionConstructor(totalHorizontalPadding: number): any {
  return transition(
    '* <=> *',
    [
      query(
        ':enter, :leave',
        /* 32px(padding of `.content__body`) x2 */
        style({ position: 'absolute', width: `calc(100% - ${totalHorizontalPadding}px)` }),
        { optional: true }
      ),
      group(
        [
          query(
            ':enter',
            [
              style({ opacity: '0' }),
              animate(
                '0.2s ease-in-out',
                style({ opacity: '1' })
              )
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [
              style({ opacity: '1' }),
              animate(
                '0.2s ease-in-out',
                style({ opacity: '0' })
              )
            ],
            { optional: true }
          )
        ]
      )
    ]
  );
}

export const MAIN_ROUTE_ANIMATION = trigger(
  'mainRouterTransition',
  [
    routeTransitionConstructor(64)
  ]
);

export const DETAILS_ROUTE_ANIMATION = trigger(
  'detailsRouterTransition',
  [
    routeTransitionConstructor(0)
  ]
);
