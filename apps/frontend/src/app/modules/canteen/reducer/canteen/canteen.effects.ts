import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { CanteenActionTypes, CanteenLoaded, CanteenLoadError } from './canteen.actions'
import { catchError, map, switchMap } from 'rxjs/operators'
import { CanteenService } from '../../services/canteen.service'
import { of } from 'rxjs'

@Injectable()
export class CanteenEffects {
  @Effect() loadCanteen$ = this.actions$.pipe(
    ofType(CanteenActionTypes.LoadCanteen),
    switchMap(() => {
      return this.canteenService.getCanteen()
    }),
    map(data => {
      return new CanteenLoaded(data)
    }),
    catchError(error => {
      return of(new CanteenLoadError(error))
    })
  )

  constructor(private actions$: Actions, private canteenService: CanteenService) {}
}
