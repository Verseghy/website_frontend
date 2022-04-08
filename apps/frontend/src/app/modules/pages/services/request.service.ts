import { Injectable } from '@angular/core'
import { PageData } from '../../../models/page'
import { Observable } from 'rxjs'
import {Apollo, gql} from "apollo-angular";
import {map, take} from "rxjs/operators";

const QUERY = gql`
  query Page($slug: String!) {
    page(slug: $slug) {
      id
      template
      name
      title
      content
      extras
    }
  }
`

interface Result {
  page: PageData
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private gql: Apollo) {}

  getPageBySlug(slug: string): Observable<PageData> {
    return this.gql.query<Result>({
      query: QUERY,
      variables: {
        slug
      }
    }).pipe(
      map(res => {
        return res.data.page
      }),
      take(1)
    )
  }
}
