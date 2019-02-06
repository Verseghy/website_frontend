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
    /* tslint:disable */
    let posts: Post[] = [
      {
        index_image: {
          id: 0,
          url: 'https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg',
        },
        author: {
          id: 0,
          name: 'Fejlesztők',
          description: '',
          image: {
            id: 0,
            url: '/assets/logo.svg',
          },
        },
        id: 0,
        title: 'Elindult az új honlapunk!',
        description: '',
        labels: [{ id: 0, name: 'Fejlesztések', color: '#a66bbe' }, { id: 1, name: 'Weboldal', color: '#61c437' }],
        type: '0',
        color: '#FFF',
        date: '',
      },
      {
        index_image: {
          id: 0,
          url: 'https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg',
        },
        author: {
          id: 0,
          name: 'Fejlesztők',
          description: '',
          image: {
            id: 0,
            url: '/assets/logo.svg',
          },
        },
        id: 0,
        title: 'Elindult az új honlapunk!',
        description: '',
        labels: [{ id: 0, name: 'Fejlesztések', color: '#a66bbe' }, { id: 1, name: 'Weboldal', color: '#61c437' }],
        type: '0',
        color: '#FFF',
        date: '',
      },
      {
        index_image: {
          id: 0,
          url: 'https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg',
        },
        author: {
          id: 0,
          name: 'Fejlesztők',
          description: '',
          image: {
            id: 0,
            url: '/assets/logo.svg',
          },
        },
        id: 0,
        title: 'Elindult az új honlapunk!',
        description: '',
        labels: [{ id: 0, name: 'Fejlesztések', color: '#a66bbe' }, { id: 1, name: 'Weboldal', color: '#61c437' }],
        type: '0',
        color: '#FFF',
        date: '',
      },
    ]
    /* tslint:enable */
    return of(posts)
  }
}
