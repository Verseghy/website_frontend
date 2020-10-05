import { Component, HostListener, OnInit, ViewChild } from '@angular/core'
import { combineLatest, Observable } from 'rxjs'
import { RequestService } from '../../services/request.service'
import { Post } from '../../../../models/Post'
import { ActivatedRoute } from '@angular/router'
import { ContrastService } from '../../../../services/contrast.service'
import { map, switchMap } from 'rxjs/operators'
import { DomSanitizer } from '@angular/platform-browser'
import { format } from 'date-fns'

@Component({
  selector: 'verseghy-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  post$: Observable<Post>
  @ViewChild('slideshow') slideshow: any

  constructor(private requestService: RequestService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.post$ = combineLatest([this.route.params, this.route.queryParams]).pipe(
      map(([params, queryParams]) => ({ params, queryParams })),
      switchMap((x) => {
        if (x.queryParams.token) {
          return this.requestService.getPostByIdPreview(x.params.id, x.queryParams.token)
        } else {
          return this.requestService.getPostById(x.params.id)
        }
      }),
      map((x) => {
        for (const i of Object.keys(x.labels)) {
          x.labels[i].isDark = ContrastService.getConstrast(x.labels[i].color)
        }
        x.content = this.sanitizer.bypassSecurityTrustHtml(this.processCustomTags(<string>x.content))
        return x
      })
    )
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'ArrowRight') {
      this.slideshow.onSlide(1)
    } else if (event.code === 'ArrowLeft') {
      this.slideshow.onSlide(-1)
    }
  }

  formatDate(date: string): string {
    return format(new Date(date), 'YYYY-MM-DD')
  }

  processCustomTags(html: string): string {
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
}
