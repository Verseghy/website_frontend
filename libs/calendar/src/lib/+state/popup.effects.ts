import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { DataPersistence } from '@nrwl/nx'

import { PopupPartialState } from './popup.reducer'
import { LoadPopup, PopupLoaded, PopupLoadError, PopupActionTypes } from './popup.actions'

@Injectable()
export class PopupEffects {
  @Effect() loadPopup$ = this.dataPersistence.fetch(PopupActionTypes.LoadPopup, {
    run: (action: LoadPopup, state: PopupPartialState) => {
      // Your custom REST 'load' logic goes here. For now just return an empty list...
      return new PopupLoaded([])
    },

    onError: (action: LoadPopup, error) => {
      console.error('Error', error)
      return new PopupLoadError(error)
    },
  })

  constructor(private actions$: Actions, private dataPersistence: DataPersistence<PopupPartialState>) {}
}
