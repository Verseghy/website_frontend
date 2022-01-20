import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { StructuredDataService } from '../../../../services/structured-data.service'
import { TitleService } from '../../../../services/title.service'
import {CanteenDay} from "../../models/cateen";
import {CanteenService} from "../../services/canteen.service";

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

  constructor(
    private structuredDataService: StructuredDataService,
    private titleService: TitleService,
    private canteenService: CanteenService,
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Menza')
    this.canteen = this.canteenService.getCanteen()
  }

  ngOnDestroy() {
    this.structuredDataService.removeStructuredData(this.structuredData0)
  }
}
