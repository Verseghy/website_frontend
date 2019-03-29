import { Component, OnInit } from '@angular/core'
import { CANTEEN_FEATURE_KEY, CanteenState, WeekCanteen } from '../../reducer/canteen/canteen.reducer'
import { select, Store } from '@ngrx/store'
import { LoadCanteen } from '../../reducer/canteen/canteen.actions'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Component({
  selector: 'verseghy-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss'],
})
export class CanteenComponent implements OnInit {
  canteen: Observable<WeekCanteen[]>

  weekdays = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
  week_prefixes = ['Heti menü', 'Jövő heti menü']

  constructor(private store: Store<CanteenState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadCanteen())
    this.canteen = this.store.pipe(
      select(CANTEEN_FEATURE_KEY),
      map((state: CanteenState) => {
        return [state.thisWeek, state.nextWeek]
      })
    )
  }
}
