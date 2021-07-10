import { trigger, transition, style, animate, query, stagger, animation } from '@angular/animations';
// https://angular.io/api/animations/listAnimation
export const listAnimation = trigger('listAnimation', [
    transition(
        ':enter',
        animation([
            style({
                transform: 'translate(200px,0)',
            }),
            animate(
                '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
                style({
                    transform: 'translate(0)',
                })
            ),
        ])
    ),
    transition(
        ':leave',
        animation([
            style({ transform: 'translate(0)' }),
            animate(
                '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
                style({
                    transform: 'translate(-200px,0)',
                })
            ),
        ])
    ),
]);

