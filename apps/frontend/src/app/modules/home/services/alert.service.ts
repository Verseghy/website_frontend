import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AlertMessage } from '../models/alert-message'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient) { }

  getAlertMessages(): Observable<AlertMessage[]> {
    // TODO: change url
    return this.http.get<AlertMessage[]>(environment.baseURL + '/')
  }
}
