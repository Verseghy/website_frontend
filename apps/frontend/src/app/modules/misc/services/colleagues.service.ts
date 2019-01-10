import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Entity } from '../reducer/colleagues/colleagues.reducer'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment.prod'

@Injectable({
  providedIn: 'root',
})
export class ColleaguesService {
  private baseURL: string = environment.baseURL + '/colleagues'

  getColleagues(): Observable<Entity[]> {
    return this.http.get<Entity[]>(this.baseURL + '/listColleagues')
  }

  constructor(private http: HttpClient) {}
}
