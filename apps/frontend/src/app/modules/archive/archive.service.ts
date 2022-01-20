import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import {Apollo, gql} from "apollo-angular";
import {map} from "rxjs/operators";
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
      posts(year: $year, month: $month)
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
    return this.gql.watchQuery<Result>({
      query: infoQUERY
    }).valueChanges.pipe(
      map(res => {
        return res.data.archive.info
      })
    )
  }

  getDetailedArchives({ year, month }: { year: number; month: number }): Observable<Post[]> {
    return this.gql.watchQuery<Result>({
      query: infoQUERY,
      variables: {
        year,
        month,
      }
    }).valueChanges.pipe(
      map(res => {
        return res.data.archive.posts
      })
    )
  }
}
