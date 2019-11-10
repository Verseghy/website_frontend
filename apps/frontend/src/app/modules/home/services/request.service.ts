import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Post } from '../../../models/Post'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment.prod'

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  listPosts(page: number): Observable<Post[]> {
    return this.http.get<Post[]>(environment.baseURL + '/posts/listPosts', {
      params: {
        page: String(page),
      },
    })
  }

  listFeaturedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.baseURL + '/posts/listFeaturedPosts')
  }
}
