import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ToastService } from '../../services/toast.service'
import { animate, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'verseghy-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toast', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate3d(0, calc(100% + 10px), 0)',
        }),
        animate(
          '200ms ease-out',
          style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
          })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
        }),
        animate(
          '200ms ease-in',
          style({
            opacity: 0,
            transform: 'translate3d(0, calc(100% + 10px), 0)',
          })
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  toast$ = this.toastService.toast$

  constructor(private toastService: ToastService) {}
}
