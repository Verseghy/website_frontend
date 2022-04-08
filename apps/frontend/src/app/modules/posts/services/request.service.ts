import { Injectable } from '@angular/core'
import { Post } from '../../../models/Post'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../../../environments/environment.prod'
import {Apollo, gql} from "apollo-angular";
import {CanteenDay} from "../../canteen/models/cateen";
import {map, take} from "rxjs/operators";

const QUERY = gql`
  query Post($id: Int!, $token: String) {
    post(id: $id, token: $token) {
      id
      title
      color
      description
      indexImage
      images
      date
      labels {
        id
        name
        color
      }
      author {
        id
        name
        description
        image
      }
      content
    }
  }
`

interface Result {
  post: Post
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private gql: Apollo) {}

  getPostById(id: number): Observable<Post> {
    return this.gql.query<Result>({
      query: QUERY,
      variables: {
        id
      }
    }).pipe(
      map(res => {
        return res.data.post
      }),
      take(1)
    )
  }

  getPostByIdPreview(id: number, token: string): Observable<Post> {
    return this.gql.query<Result>({
      query: QUERY,
      variables: {
        id,
        token
      }
    }).pipe(
      map(res => {
        return res.data.post
      }),
      take(1)
    )
  }
}
