import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CalendarComponent } from './calendar.component'
import { PopupComponent } from './popup/popup.component'

@NgModule({
  imports: [CommonModule],
  declarations: [CalendarComponent, PopupComponent],
  exports: [CalendarComponent],
})
export class CalendarModule {}
