import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { PageData } from '../../../models/page'
import { MenuItem } from '../models/menu-item'
import {Apollo, gql} from "apollo-angular";
import {map, take} from "rxjs/operators";

const pageQUERY = gql`
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

interface pageResult {
  page: PageData
}

const menuQUERY = gql`
  query {
    menu {
      name
      type
      link
      slug
      children {
        name
        type
        link
        slug
      }
    }
  }
`

interface menuResult {
  menu: MenuItem[]
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private gql: Apollo, private http: HttpClient) {}

  getPageBySlug(slug: string): Observable<PageData> {
    return this.gql.query<pageResult>({
      query: pageQUERY,
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

  getMenuItems(): Observable<MenuItem[]> {
    return this.gql.query<menuResult>({
      query: menuQUERY
    }).pipe(
      map(res => {
        return res.data.menu
      }),
      take(1)
    )
  }
}
