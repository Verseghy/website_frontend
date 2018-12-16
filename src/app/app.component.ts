import { Component } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  group
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerAnimation', [
      transition('* => *', [
        group([
          query(
            ':enter', [
              style({
                opacity: 0,
                transform: 'translateY(50px)',
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                zIndex: '8'
              }),
              animate(
                '100ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateY(0)'
                })
              )
            ],
            { optional: true }
          ),
          query(
            ':leave', [
              style({
                opacity: 1,
              }),
              animate(
                '100ms',
                style({ opacity: 0 })
              )
            ],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {

  constructor() { }
}
