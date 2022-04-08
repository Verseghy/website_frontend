import { Injectable } from '@angular/core'
import {Observable, of} from 'rxjs'
import { getISOWeek } from 'date-fns'
import { CanteenDay } from "../models/cateen";
import {Apollo, gql} from "apollo-angular";
import {map, take} from "rxjs/operators";

const QUERY = gql`
  query CanteenTwoWeeks($year1: Int!, $week1: Int!, $year2: Int!, $week2: Int!) {
    w1: canteen(year: $year1, week: $week1) {
      ...canteen
    }
    w2: canteen(year: $year2, week: $week2) {
      ...canteen
    }
  }
    
  fragment canteen on Canteen {
    date
    menus {
      menu
      type
    }
  }
`

interface Result {
  w1: CanteenDay[]
  w2: CanteenDay[]
}

@Injectable({
  providedIn: 'root',
})
export class CanteenService {
  constructor(private gql: Apollo) {}

  getCanteen(): Observable<[CanteenDay[], CanteenDay[]]> {
    const now: Date = new Date()
    const year: number = now.getFullYear()
    const week: number = getISOWeek(now)

    return this.gql.query<Result>({
      query: QUERY,
      variables: {
        year1: year,
        year2: year,
        week1: week,
        week2: week + 1,
      }
    }).pipe(
      take(1),
      map(res => {
        return [res.data.w1, res.data.w2]
      })
    )
  }
}
