import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AlertMessage } from '../models/alert-message'

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  getAlertMessages(): Observable<AlertMessage[]> {
    return of([])
  }
}
