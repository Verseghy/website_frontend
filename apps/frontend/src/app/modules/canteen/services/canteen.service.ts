import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment.prod'
import { forkJoin, Observable, of } from 'rxjs'
import { Entity } from '../reducer/canteen/canteen.reducer'
import { HttpClient } from '@angular/common/http'
import { getISOWeek } from 'date-fns'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class CanteenService {
  private baseURL: string = environment.baseURL + '/canteen'

  private getForWeek(year: number, week: number): Observable<Entity[]> {
    return this.http
      .get<Entity[]>(`${this.baseURL}/getCanteenByWeek`, {
        params: {
          week: String(week),
          year: String(year),
        },
      })
      .pipe(catchError(() => of([])))
  }
  getCanteen(): Observable<[Entity[], Entity[]]> {
    const now: Date = new Date()
    const year: number = now.getFullYear()
    const week: number = getISOWeek(now)

    const thisWeek = this.getForWeek(year, week)
    const nextWeek = this.getForWeek(year, week + 1)

    return forkJoin([thisWeek, nextWeek])
  }

  constructor(private http: HttpClient) {}
}
