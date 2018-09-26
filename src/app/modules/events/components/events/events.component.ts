import { Component, OnInit, ViewChild } from '@angular/core';
import { Settings } from '@verseghy/ngx-calendar-lib/lib/ngx-calendar-lib.interfaces';
import { NgxCalendarLibComponent } from '@verseghy/ngx-calendar-lib';
import { RequestService } from '../../../events/services/request.service';
import { Event } from '@verseghy/ngx-calendar-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public settings: Settings = {
    shortDayNames: ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V']
  };

  @ViewChild(NgxCalendarLibComponent) calendar;

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.calendar.monthChange$.subscribe(x => {
      this.request.getEventsByMonth(x)
        .pipe(map((datas: Array<any>) => {
          const eventarray = datas.map(data => {
            return new Event(data.id, data.title, data.description, new Date(data.date_from), new Date(data.date_to), data.color);
          });
          return eventarray;
        }))
        .subscribe(datas => {
          this.calendar.setEvents(datas)
        });
    });
  }

}
