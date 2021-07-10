import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
// https://angular.io/api/animations/stagger
export const listAnimation = trigger('listAnimation', [
    transition(':enter, * => 0, * => -1', []),
    transition(':increment', [
        query(':enter', [
            style({ opacity: 0, width: '0px' }),
            stagger(50, [
                animate('300ms ease-out', style({ opacity: 1, width: '*' })),
            ]),
        ], { optional: true })
    ]),
    transition(':decrement', [
        query(':leave', [
            stagger(50, [
                animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
            ]),
        ])
    ]),
]);

