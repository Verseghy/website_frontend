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
        edges {
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
          endCursor
          hasPreviousPage
        }
      }
    }
  }
`

const labelQUERY = gql`
  query LabelQuery($labelID: Int!) {
    label(id: $labelID) {
      posts {
        edges {
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
          endCursor
          hasPreviousPage
        }
      }
    }
  }
`

const termQUERY = gql`
  query TermQuery($term: Int!) {
    search(term: $term, last: 20) {
      edges {
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
        endCursor
        hasPreviousPage
      }
    }
  }
`

interface authorResult {
  author: {
    posts: {
      pageInfo: PageInfo
      edges: {
        node: Post
        cursor: string
      }[]
    }
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
    posts: {
      pageInfo: PageInfo
      edges: {
        node: Post
        cursor: string
      }[]
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private gql: Apollo, private http: HttpClient) {}

  queryTerm(term: string): Observable<Post[]> {
    return this.gql.query<termResult>({
      query: termQUERY,
      variables: {
        term
      }
    }).pipe(
      map(res => {
        return res.data.search.edges.map(edge => edge.node)
      }),
      take(1)
    )
  }

  queryLabel(labelID: number): Observable<Post[]> {
    return this.gql.query<labelResult>({
      query: labelQUERY,
      variables: {
        labelID
      }
    }).pipe(
      map(res => {
        return res.data.label.posts.edges.map(edge => edge.node)
      }),
      take(1)
    )
  }

  queryAuthor(authorID: number): Observable<Post[]> {
    return this.gql.query<authorResult>({
      query: authorQUERY,
      variables: {
        authorID
      }
    }).pipe(
      map(res => {
        return res.data.author.posts.edges.map(edge => edge.node)
      }),
      take(1)
    )
  }
}
