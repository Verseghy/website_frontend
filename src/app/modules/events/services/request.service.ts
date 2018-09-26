import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getEventsByMonth(date) {
    return this.http.get(environment.baseURL + '/events/getEventsByMonth', {
      params: {
        year: date.year,
        month: date.month + 1,
      }
    });
  }
}
