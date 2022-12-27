import { ChangeDetectionStrategy, Component, Inject, Input, PLATFORM_ID } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { isPlatformBrowser } from '@angular/common'
import { environment } from 'apps/frontend/src/environments/environment'

const imageOrigin = new URL(environment.origin)

@Component({
  selector: 'verseghy-page-renderer',
  templateUrl: './page-renderer.component.html',
  styleUrls: ['./page-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageRendererComponent {
  @Input() title: string
  @Input() data: string

  constructor(private domSanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformID: Object) {}

  get content() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.processCustomTags(this.data))
  }

  private fixURLOrigin(src: string): string {
    const url = new URL(src)

    if (url.origin != imageOrigin.origin) {
      url.host = imageOrigin.host
      url.protocol = imageOrigin.protocol
      url.port = imageOrigin.port
    }

    return url.href
  }

  private processCustomTags(html: string): string {
    if (!html) return ''

    if (!isPlatformBrowser(this.platformID)) return html // TODO(zoltanszepesi): fix this
    const parser = new DOMParser()
    const dom = parser.parseFromString(html, 'text/html')
    const links = Array.from(dom.getElementsByTagName('a'))

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
