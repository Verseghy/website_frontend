import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CalendarComponent } from './calendar.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { POPUP_FEATURE_KEY, initialState as popupInitialState, popupReducer } from './+state/popup.reducer'
import { PopupEffects } from './+state/popup.effects'
import { CELLS_FEATURE_KEY, initialState as cellsInitialState, cellsReducer } from './+state/cells.reducer'
import { CellsEffects } from './+state/cells.effects';
import { MoreDetailsDialogComponent } from './more-details-dialog/more-details-dialog.component'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    StoreModule.forFeature(POPUP_FEATURE_KEY, popupReducer, { initialState: popupInitialState }),
    EffectsModule.forFeature([PopupEffects]),
    StoreModule.forFeature(CELLS_FEATURE_KEY, cellsReducer, { initialState: cellsInitialState }),
    EffectsModule.forFeature([CellsEffects]),
  ],
  entryComponents: [MoreDetailsDialogComponent],
  declarations: [CalendarComponent, MoreDetailsDialogComponent],
  exports: [CalendarComponent],
})
export class CalendarModule {}
