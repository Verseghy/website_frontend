import { Injectable } from '@angular/core'
import {BehaviorSubject, Observable, of, Subject} from 'rxjs'
import { Post } from '../../../models/Post'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment.prod'
import {Apollo, gql, QueryRef} from "apollo-angular";
import {CanteenDay} from "../../canteen/models/cateen";
import {map, take, tap} from "rxjs/operators";

const QUERY = gql`
  query Posts($featured: Boolean, $after: String, $before: String, $first: Int, $last: Int) {
    posts(featured: $featured, after: $after, before: $before, first: $first, last: $last) {
      edges {
        cursor
        node {
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
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`

interface PageInfo {
  hasPreviousPage: boolean
  hasNextPage: boolean
  startCursor: string
  endCursor: string
}

interface Result {
  posts: {
    pageInfo: PageInfo
    edges: {
      node: Post
      cursor: string
    }[]
  }
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  listQuery: QueryRef<Result>
  posts?: Post[]
  pageInfo?: PageInfo
  pageInfo$: Subject<PageInfo> = new BehaviorSubject<PageInfo>({hasPreviousPage: true, hasNextPage: false, startCursor: "", endCursor: ""})

  constructor(private gql: Apollo) {
    this.listQuery = this.gql.watchQuery<Result>({
      query: QUERY,
      variables: {
        featured: false,
        last: 20,
      },
      fetchPolicy: 'network-only'
    })

    const s = this.listQuery.valueChanges.subscribe(res => {
      this.pageInfo = res.data.posts.pageInfo
      this.pageInfo$.next(this.pageInfo)
      s.unsubscribe()
    })
  }

  async fetchMore() {
    await this.listQuery.fetchMore({
      variables: {
        last: 20,
        before: this.pageInfo.endCursor
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        this.pageInfo = fetchMoreResult.posts.pageInfo
        this.pageInfo$.next(this.pageInfo)

        return {
          posts: {
            edges: [...prev.posts.edges, ...fetchMoreResult.posts.edges],
            pageInfo: fetchMoreResult.posts.pageInfo
          }
        }
      }
    })
  }

  hasPreviousPage(): Observable<PageInfo> {
    return this.pageInfo$
  }

  listPosts(): Observable<Post[]> {
    return this.listQuery.valueChanges.pipe(map(res => {
      return res.data.posts.edges.map(edge => edge.node)
    }))
  }

  listFeaturedPosts(): Observable<Post[]> {
    return this.gql.watchQuery<Result>({
      query: QUERY,
      variables: {
        featured: true,
        last: 20
      }
    }).valueChanges.pipe(
      map(res => {
        return res.data.posts.edges.map(edge => edge.node)
      }),
      take(1)
    )
  }
}
