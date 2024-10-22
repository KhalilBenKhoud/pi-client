import { trigger, state, style, animate, transition } from '@angular/animations';

export const animations = [
    trigger('slideLeft', [
      state('void', style({ transform: 'translateX(-100%)', opacity: 0 })),
      state('*', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('void => *', [
        animate('0.8s ease-out')
      ])
    ]),
    trigger('slideRight',[
      state('void', style({transform : 'translateX(100%)', opacity : 0})),
      state('*',style({transform : 'translateX(0)', opacity : 1})),
      transition('void => *', [animate('0.8s ease-out')])
    ]),
    trigger('slideUp', [
      state('void', style({ transform: 'translateY(100%)', opacity: 0 })),
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        animate('0.8s ease-out')
      ])
    ]),
    trigger('slideDown',[
      state('void', style({transform : 'translateY(-100%)', opacity : 0})),
      state('*',style({transform : 'translateY(0)', opacity : 1})),
      transition('void => *', [animate('0.8s ease-out')])
    ]),
    trigger('flip', [
      state('void',style({transform : 'rotateY(90deg)', opacity: 0})),
      state('*',style({tranform: 'rotateY(0deg)', opacity: 1})),
      transition('void => *', [animate('1s ease')])
    ])
  ]
  
