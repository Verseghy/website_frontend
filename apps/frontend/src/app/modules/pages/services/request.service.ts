import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { PageData } from '../models/page'
import { environment } from '../../../../environments/environment.prod'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {}

  getPageBySlug(slug: string): Observable<PageData> {
    return this.http.get<PageData>(environment.baseURL + '/pages/getPageBySlug', {
      params: new HttpParams().set('slug', slug),
    })
  }
}
