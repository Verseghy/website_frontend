import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Post } from '../../../models/Post'
import { environment } from '../../../../environments/environment'
import {Apollo, gql} from "apollo-angular";
import {map, take} from "rxjs/operators";

const authorQUERY = gql`
  query AuthorQuery($authorID: Int!) {
    author(id: $authorID) {
      posts {
        id
        title
        description
        color
        author {
          name
          image
        }
        date
        indexImage
        labels {
          name
          color
        }
      }
    }
  }
`

interface authorResult {
  author: {
    posts: Post[]
  }
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private gql: Apollo, private http: HttpClient) {}

  queryTerm(term: string): Observable<Post[]> {
    return this.http.get<Post[]>(environment.baseURL + '/posts/search', { params: { term } })
  }

  queryLabel(labelID: string): Observable<Post[]> {
    return this.http.get<Post[]>(environment.baseURL + '/posts/getPostsByLabel', { params: { id: labelID } })
  }

  queryAuthor(authorID: number): Observable<Post[]> {
    return this.gql.watchQuery<authorResult>({
      query: authorQUERY,
      variables: {
        authorID
      }
    }).valueChanges.pipe(
      map(res => {
        return res.data.author.posts
      }),
      take(1)
    )
  }
}
