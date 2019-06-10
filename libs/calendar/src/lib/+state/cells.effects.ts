import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'

import { CellsPartialState } from './cells.reducer'

@Injectable()
export class CellsEffects {
  constructor(private actions$: Actions) {}
}
