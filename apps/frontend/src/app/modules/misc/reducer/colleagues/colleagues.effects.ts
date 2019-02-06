import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { ColleaguesActionTypes, ColleaguesLoaded, ColleaguesLoadError } from './colleagues.actions'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { catchError, map, switchMap } from 'rxjs/operators'
import { ColleaguesService } from '../../services/colleagues.service'

@Injectable()
export class ColleaguesEffects {
  @Effect() loadColleagues: Observable<Action> = this.actions$.pipe(
    ofType(ColleaguesActionTypes.LoadColleagues),
    switchMap(() => {
      return this.colleaguesService.getColleagues()
    }),
    map(data => {
      return new ColleaguesLoaded(data)
    }),
    catchError(error => {
      return of(new ColleaguesLoadError(error))
    })
  )

  constructor(private actions$: Actions, private colleaguesService: ColleaguesService) {}
}
