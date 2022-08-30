import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { StructuredDataService } from '../../../../services/structured-data.service'
import { TitleService } from '../../../../services/title.service'
import { CanteenDay, Menu } from '../../models/cateen'
import { CanteenService } from '../../services/canteen.service'
import { getDay } from 'date-fns'

@Component({
  selector: 'verseghy-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanteenComponent implements OnInit, OnDestroy {
  canteen: Observable<[CanteenDay[], CanteenDay[]]>

  weekdays = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
  week_prefixes = ['Heti menü', 'Jövő heti menü']

  structuredData0 = this.structuredDataService.addBreadcrumb([
    { item: 'https://verseghy-gimnazium.net/', position: 0, name: 'Főoldal' },
    { item: 'https://verseghy-gimnazium.net/canteen', position: 1, name: 'Menza' },
  ])

  days: Observable<[Menu, Menu, Menu?] | null>[] = []

  constructor(
    private structuredDataService: StructuredDataService,
    private titleService: TitleService,
    private canteenService: CanteenService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Menza')
    this.canteen = this.canteenService.getCanteen()

    for (let week = 0; week < 2; week++) {
      for (let day = 0; day < 5; day++) {
        this.days[day + week * 5] = this.canteen.pipe(
          map((weeks) => {
            for (const weekDay of weeks[week]) {
              if (getDay(weekDay.date) - 1 === day) {
                return weekDay.menus
              }
            }
            return null
          })
        )
      }
    }
  }

  ngOnDestroy() {
    this.structuredDataService.removeStructuredData(this.structuredData0)
  }
}
