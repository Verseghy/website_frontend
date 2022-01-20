import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Post } from '../../../models/Post'
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

const labelQUERY = gql`
  query LabelQuery($labelID: Int!) {
    label(id: $labelID) {
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

const termQUERY = gql`
  query TermQuery($term: Int!) {
    search(term: $term, last: 20) {
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

interface authorResult {
  author: {
    posts: Post[]
  }
}

interface PageInfo {
  hasPreviousPage: boolean
  hasNextPage: boolean
  startCursor: string
  endCursor: string
}

interface termResult {
  search: {
    pageInfo: PageInfo
    edges: {
      node: Post
      cursor: string
    }[]
  }
}

interface labelResult {
  label: {
    posts: Post[]
  }
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private gql: Apollo, private http: HttpClient) {}

  queryTerm(term: string): Observable<Post[]> {
    return this.gql.watchQuery<termResult>({
      query: termQUERY,
      variables: {
        term
      }
    }).valueChanges.pipe(
      map(res => {
        return res.data.search.edges.map(edge => edge.node)
      }),
      take(1)
    )
  }

  queryLabel(labelID: number): Observable<Post[]> {
    return this.gql.watchQuery<labelResult>({
      query: labelQUERY,
      variables: {
        labelID
      }
    }).valueChanges.pipe(
      map(res => {
        return res.data.label.posts
      }),
      take(1)
    )
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
