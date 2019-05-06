import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { DataPersistence } from '@nrwl/nx'

import { CellsPartialState } from './cells.reducer'

@Injectable()
export class CellsEffects {
  constructor(private actions$: Actions, private dataPersistence: DataPersistence<CellsPartialState>) {}
}
