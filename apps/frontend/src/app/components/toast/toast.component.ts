import { Component } from '@angular/core'
import { ToastService } from '../../services/toast.service'

@Component({
  selector: 'verseghy-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toast$ = this.toastService.toast$

  constructor(private toastService: ToastService) {}
}
