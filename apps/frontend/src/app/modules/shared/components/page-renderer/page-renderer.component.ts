import { ChangeDetectionStrategy, Component, Inject, Input, PLATFORM_ID } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { isPlatformBrowser } from '@angular/common'
import { environment } from 'apps/frontend/src/environments/environment'

@Component({
  selector: 'verseghy-page-renderer',
  templateUrl: './page-renderer.component.html',
  styleUrls: ['./page-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageRendererComponent {
  private static imageOrigin = new URL(environment.origin)

  @Input() title: string
  @Input() data: string

  constructor(private domSanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformID: Object) {}

  get content() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.processCustomTags(this.data))
  }

  private fixURLOrigin(src: string): string {
    const url = new URL(src)

    if (url.origin != PageRendererComponent.imageOrigin.origin) {
      url.host = PageRendererComponent.imageOrigin.host
      url.protocol = PageRendererComponent.imageOrigin.protocol
      url.port = PageRendererComponent.imageOrigin.port
    }

    return url.href
  }

  private processCustomTags(html: string): string {
    if (!html) return ''

    if (!isPlatformBrowser(this.platformID)) return html // TODO(zoltanszepesi): fix this
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
      element.style.maxWidth = table.style.width

      table.style.width = '100%'

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

      image.style.maxWidth = image.style.width
      image.style.width = '100%'

      image.src = this.fixURLOrigin(image.src)
    }

    return dom.documentElement.innerHTML
  }
}
