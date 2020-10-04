import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { DomSanitizer, Title } from '@angular/platform-browser'
import { SubSink } from 'subsink'
import { RequestService } from '../../services/request.service'
import { Subject, throwError } from 'rxjs'

@Component({
  selector: 'verseghy-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private titleService: Title,
    private domSanitizer: DomSanitizer
  ) {}

  private subsink = new SubSink()

  slug$ = this.route.params.pipe(map(({ slug }) => slug))
  data$ = this.slug$.pipe(
    switchMap((slug) => this.requestService.getPageBySlug(slug)),
    tap(() => this.error$.next(false)),
    catchError((error) => {
      this.error$.next(true)
      return throwError(error)
    })
  )
  content$ = this.data$.pipe(
    map((data) => {
      return this.domSanitizer.bypassSecurityTrustHtml(PageComponent._processCustomTags(data.content))
    })
  )
  error$ = new Subject<boolean>()

  // creates a div element around table elements,
  // sets links target to _blank
  // and removes p tag around img tags
  private static _processCustomTags(html: string): string {
    const parser = new DOMParser()
    const dom = parser.parseFromString(html, 'text/html')
    const tables = Array.from(dom.getElementsByTagName('table'))
    const links = Array.from(dom.getElementsByTagName('a'))

    for (const table of tables) {
      const parentNode = table.parentNode
      const index = Array.from(parentNode.children).indexOf(table)

      const element = dom.createElement('div')
      element.classList.add('table-container')
      element.append(table)

      parentNode.insertBefore(element, parentNode.children[index])
    }

    links.forEach((link) => {
      link.setAttribute('target', '_blank')
    })

    const images = Array.from(dom.getElementsByTagName('img'))
    for (const image of images) {
      const parent = image.parentElement
      const parent2 = parent.parentElement

      const index = Array.from(parent2.children).indexOf(parent)
      parent2.insertBefore(image, parent2.children[index])
    }

    return dom.documentElement.innerHTML
  }

  ngOnInit(): void {
    this.subsink.sink = this.data$.subscribe((data) => {
      this.titleService.setTitle(data.title)
    })
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe()
  }
}
