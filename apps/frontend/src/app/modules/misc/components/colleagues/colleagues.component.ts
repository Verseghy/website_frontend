import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { select, Store } from '@ngrx/store'
import { COLLEAGUES_FEATURE_KEY, ColleaguesState, Entity } from '../../reducer/colleagues/colleagues.reducer'
import { fromColleaguesActions, LoadColleagues } from '../../reducer/colleagues/colleagues.actions'
import { selectVisible } from '../../reducer/colleagues/colleagues.selectors'
import { StructuredDataService } from '../../../../services/structured-data.service'
import { TitleService } from '../../../../services/title.service'

@Component({
  selector: 'verseghy-colleagues',
  templateUrl: './colleagues.component.html',
  styleUrls: ['./colleagues.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColleaguesComponent implements OnInit, OnDestroy {
  categories: string[] = [
    'Vezetőség',
    'Tanárok',
    'Óraadók',
    'Nevelő, oktató munkát közvetlenül segítők',
    'Karbantartók, portások, takarítók',
  ]
  colleagues: Observable<Entity[][]>

  visible = this.store.pipe(select(selectVisible))

  structuredData0 = this.structuredDataService.addBreadcrumb([
    { item: 'https://verseghy-gimnazium.net/', position: 0, name: 'Főoldal' },
    { item: 'https://verseghy-gimnazium.net/misc/colleagues', position: 1, name: 'Munkatársak' },
  ])

  constructor(
    private store: Store<ColleaguesState>,
    private structuredDataService: StructuredDataService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Munkatársak')
    this.store.dispatch(new LoadColleagues())
    this.colleagues = this.store.pipe(
      select((state) => state[COLLEAGUES_FEATURE_KEY]),
      map((state: ColleaguesState) => {
        return state.categories
      })
    )
  }

  ngOnDestroy() {
    this.structuredDataService.removeStructuredData(this.structuredData0)
  }

  setVisible(number: number, boolean: boolean) {
    this.store.dispatch(new fromColleaguesActions.CategoryInViewport([number, boolean]))
  }
}
