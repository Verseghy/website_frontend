import { Component, OnInit } from '@angular/core';
import { Settings } from '@verseghy/ngx-calendar-lib/lib/ngx-calendar-lib.interfaces';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public settings: Settings = {
    shortDayNames: ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V']
  };

  constructor() {
  }

  ngOnInit() {
  }

}
