import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { CANTEEN_FEATURE_KEY, CanteenState, WeekCanteen } from '../../reducer/canteen/canteen.reducer'
import { select, Store } from '@ngrx/store'
import { LoadCanteen } from '../../reducer/canteen/canteen.actions'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { StructuredDataService } from '../../../../services/structured-data.service'
import { TitleService } from '../../../../services/title.service'

@Component({
  selector: 'verseghy-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanteenComponent implements OnInit, OnDestroy {
  canteen: Observable<WeekCanteen[]>

  weekdays = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
  week_prefixes = ['Heti menü', 'Jövő heti menü']

  structuredData0 = this.structuredDataService.addBreadcrumb([
    { item: 'https://verseghy-gimnazium.net/', position: 0, name: 'Főoldal' },
    { item: 'https://verseghy-gimnazium.net/canteen', position: 1, name: 'Menza' },
  ])

  constructor(
    private store: Store<CanteenState>,
    private structuredDataService: StructuredDataService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Menza')
    this.store.dispatch(new LoadCanteen())
    this.canteen = this.store.pipe(
      select((state) => state[CANTEEN_FEATURE_KEY]),
      map((state: CanteenState) => {
        return [state.thisWeek, state.nextWeek]
      })
    )
  }

  ngOnDestroy() {
    this.structuredDataService.removeStructuredData(this.structuredData0)
  }
}
