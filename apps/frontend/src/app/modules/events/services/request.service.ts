import { Injectable } from '@angular/core'
import { Entity } from '../reducer/events.reducer'
import { Observable } from 'rxjs'
import {Apollo, gql} from "apollo-angular";
import {map, take} from "rxjs/operators";

const QUERY = gql`
  query EventsSeptember($year: Int!, $month: Int!) {
    events(year: $year, month: $month) {
      id
      dateFrom
      dateTo
      title
      description
      color
    }
  }
`

interface Result {
  events: Entity[]
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  constructor(private gql: Apollo) {}

  getEvents({year, month}: { year: number; month: number }): Observable<Entity[]> {
    return this.gql.query<Result>({
      query: QUERY,
      variables: {
        year,
        month
      }
    }).pipe(
      map(res => {
        return res.data.events
      }),
      take(1)
    )
  }
}
