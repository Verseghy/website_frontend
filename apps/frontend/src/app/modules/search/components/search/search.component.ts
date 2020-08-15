import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { combineLatest, Observable, Subscription } from 'rxjs'
import { SearchService } from '../../services/search.service'
import { Post } from '../../../../models/Post'

@Component({
  selector: 'verseghy-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private asd$: Subscription

  posts$: Observable<Post[]>

  constructor(private route: ActivatedRoute, private service: SearchService) { }

  ngOnInit(): void {
    this.asd$ = combineLatest([this.route.params, this.route.data]).subscribe(([params, data]) => {
      if (!params || !data) return

      if (data.type === 'term') {
        this.posts$ = this.service.queryTerm(params.term)
      } else if (data.type === 'label') {
        this.posts$ = this.service.queryLabel(params.term)
      }
    })
  }

  ngOnDestroy() {
    this.asd$.unsubscribe()
  }

}
