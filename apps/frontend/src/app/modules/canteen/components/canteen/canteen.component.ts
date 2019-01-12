import { Component, OnInit } from '@angular/core'
import { CANTEEN_FEATURE_KEY, CanteenState, Entity } from '../../reducer/canteen/canteen.reducer'
import { select, Store } from '@ngrx/store'
import { LoadCanteen } from '../../reducer/canteen/canteen.actions'
import { map } from 'rxjs/operators'

@Component({
  selector: 'verseghy-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss']
})
export class CanteenComponent implements OnInit {

  thisWeek: Entity[]
  nextWeek: Entity[]

  constructor(private store: Store<CanteenState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadCanteen())
    const canteen = this.store.pipe(
      select(CANTEEN_FEATURE_KEY),
      map((state: CanteenState) => {
        return state.canteen
      })
    )
    this.thisWeek = canteen[0]
    this.nextWeek = canteen[1]
  }
}
