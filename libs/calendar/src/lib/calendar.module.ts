import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CalendarComponent } from '@verseghy/calendar'
import { PopupComponent } from './popup/popup.component'

@NgModule({
  imports: [CommonModule],
  declarations: [CalendarComponent, PopupComponent],
  exports: [CalendarComponent],
})
export class CalendarModule {}
