import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Toast, ToastAction } from '../models/toast'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast$ = new BehaviorSubject<Toast | null>(null)

  constructor() {}

  public createToast(message: string, actions: ToastAction[]): void {
    this.toast$.next({ message, actions })
  }

  public removeToast(): void {
    this.toast$.next(null)
  }
}
