import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../../../environments/environment.prod'
import { Observable } from 'rxjs'
import { PageData } from '../../../models/page'
import { MenuItem } from '../models/menu-item'

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  getPageBySlug(slug: string): Observable<PageData> {
    return this.http.get<PageData>(environment.baseURL + '/pages/getPageBySlug', {
      params: new HttpParams().set('slug', slug),
    })
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(environment.baseURL + '/menu/getMenuItems')
  }
}
