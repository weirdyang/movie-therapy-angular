import { trigger, transition, style, animate, query, stagger, animation, sequence, state } from '@angular/animations';
// https://angular.io/api/animations/listAnimation
export const listAnimation
    = trigger('listAnimation', [
        transition('void => *', [
            style({ height: '*', opacity: '0', 'box-shadow': 'none' }),
            sequence([
                animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none' })),
                animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
            ])
        ])
    ]);

export const listStagger
    = trigger('listStagger', [
        transition('* <=> *', [
            query(
                ':enter',
                [
                    style({ opacity: 0, transform: 'translateY(-15px)' }),
                    stagger(
                        '50ms',
                        animate(
                            '550ms ease-out',
                            style({ opacity: 1, transform: 'translateY(0px)' })
                        )
                    )
                ],
                { optional: true }
            ),
            query(':leave', animate('50ms', style({ opacity: 0 })), {
                optional: true
            })
        ])
    ])

export const showCard
    = trigger('showCard', [
        state('visible', style({
            opacity: 1
        })),
        state('offScreen', style({
            opacity: 0
        })),
        transition('visible => offscreen', animate('600ms ease-out')),
        transition('offScreen => visible', animate('1000ms ease-in'))
    ])