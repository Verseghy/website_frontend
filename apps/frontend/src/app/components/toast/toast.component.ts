import { Component, OnInit } from '@angular/core'
import { ToastService } from '../../services/toast.service'

@Component({
  selector: 'verseghy-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  toast$ = this.toastService.toast$

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.createToast(
      'This is a random text! This is a random text! This is a random text! This is a random text! This is a random text! This is a random text! This is a random text! This is a random text! This is a random text! ',
      [
        {
          title: 'button 1',
          callback: () => {
            console.log('button 1 asd')
          },
        },
      ]
    )
  }
}
