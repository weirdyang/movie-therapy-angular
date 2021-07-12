import { trigger, transition, style, animate, query, stagger, animation, sequence } from '@angular/animations';
// https://angular.io/api/animations/listAnimation
export const listAnimation
    = trigger('listAnimation', [
        transition('void => *', [
            style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
            sequence([
                animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none' })),
                animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
            ])
        ])
    ]);

export const listStagger
    = trigger('listAnimation', [
        transition('* => *', [ // each time the binding value changes
            query(':leave', [
                stagger(100, [
                    animate('0.5s', style({ opacity: 0 }))
                ])
            ], { optional: true }),
            query(':enter', [
                style({ opacity: 0 }),
                stagger(100, [
                    animate('0.5s', style({ opacity: 1 }))
                ])
            ], { optional: true })
        ])
    ])