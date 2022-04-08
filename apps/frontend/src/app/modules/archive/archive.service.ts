import { Injectable } from '@angular/core'
import {Apollo, gql} from "apollo-angular";
import {map, take} from "rxjs/operators";
import {Observable} from "rxjs";
import {Post} from "../../models/Post";

const infoQUERY = gql`
  query {
    archive {
      info {
        count
        year
        month
      }
    }
  }
`

const postsQUERY = gql`
  query Archive($year: Int!, $month: Int!) {
    archive {
      posts(year: $year, month: $month) {
        id
        date
        title
        description
      }
    }
  }
`

interface Result {
  archive: {
    info: Stats[]
    posts: Post[]
  }
}

export interface Stats { count: number, year: number, month: number}

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  constructor(private gql: Apollo) {}

  getArchives(): Observable<Stats[]> {
    return this.gql.query<Result>({
      query: infoQUERY
    }).pipe(
      map(res => {
        return res.data.archive.info
      }),
      take(1)
    )
  }

  getDetailedArchives({ year, month }: { year: number; month: number }): Observable<Post[]> {
    return this.gql.query<Result>({
      query: postsQUERY,
      variables: {
        year,
        month,
      }
    }).pipe(
      map(res => {
        return res.data.archive.posts
      }),
      take(1)
    )
  }
}
