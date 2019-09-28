import { Injectable } from '@angular/core'
import { Post } from '../../../models/Post'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../../../environments/environment.prod'

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(environment.baseURL + '/posts/getPost', {
      params: new HttpParams().set('id', id),
    })
  }

  getPostByIdPreview(id: string, token: string): Observable<Post> {
    return this.http.get<Post>(environment.baseURL + '/posts/getPreview', {
      params: { id, token },
    })
  }
}
