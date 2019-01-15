import { Injectable } from '@angular/core'
import { Entity } from '../reducer/events.reducer'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseURL = environment.baseURL + '/events'

  constructor(private http: HttpClient) { }

  getEvents(month: {year: number, month: number}): Observable<Entity[]> {
    return this.http.get<Entity[]>(this.baseURL + '/getEventsByMonth', {
     params: {
       'year': month.year.toString(),
       'month': month.month.toString()
     }
    })
  }
}
