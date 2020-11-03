import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'verseghy-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  private _noIndexElement: HTMLElement

  constructor(@Inject(DOCUMENT) private _document) {}

  ngOnInit(): void {
    this._noIndexElement = this._document.createElement('meta')
    this._noIndexElement.setAttribute('name', 'robots')
    this._noIndexElement.setAttribute('content', 'noindex')
    this._document.head.appendChild(this._noIndexElement)
  }

  ngOnDestroy(): void {
    this._noIndexElement.remove()
  }
}
