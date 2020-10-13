import { Component, Input } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'verseghy-page-renderer',
  templateUrl: './page-renderer.component.html',
  styleUrls: ['./page-renderer.component.scss'],
})
export class PageRendererComponent {
  @Input() title: string
  @Input() data: string

  constructor(private domSanitizer: DomSanitizer) {}

  get content() {
    return this.domSanitizer.bypassSecurityTrustHtml(PageRendererComponent._processCustomTags(this.data))
  }

  private static _processCustomTags(html: string): string {
    if (!html)
      return ''

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
    }

    return dom.documentElement.innerHTML
  }
}
