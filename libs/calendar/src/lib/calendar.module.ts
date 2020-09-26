import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CalendarComponent } from './calendar.component'
import { PopupComponent } from './popup/popup.component'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faAngleLeft, faAngleRight, faTimes } from '@fortawesome/free-solid-svg-icons'

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [CalendarComponent, PopupComponent],
  exports: [CalendarComponent],
})
export class CalendarModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faAngleLeft, faAngleRight, faTimes)
  }
}
