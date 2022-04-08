import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Entity } from '../reducer/colleagues/colleagues.reducer'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment.prod'
import {Apollo, gql} from "apollo-angular";
import {CanteenDay} from "../../canteen/models/cateen";
import {map, take} from "rxjs/operators";

const QUERY = gql`
  query {
    colleagues {
      id
      name
      jobs
      subjects
      roles
      awards
      image
      category
    }
  }
`

interface Result {
  colleagues: Entity[]
}

@Injectable({
  providedIn: 'root',
})
export class ColleaguesService {
  getColleagues(): Observable<Entity[]> {
    return this.gql.query<Result>({
      query: QUERY
    }).pipe(
      map(res => res.data.colleagues),
      take(1)
    )
  }

  constructor(private gql: Apollo) {}
}
