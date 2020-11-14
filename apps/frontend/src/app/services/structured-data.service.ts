import { Inject, Injectable } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { DOCUMENT } from '@angular/common'

export type BreadCrumbURL = string

export interface BreadCrumb {
  name: string
  position: number
  item: BreadCrumbURL
}

export interface Article {
  headline: string
  images: string[]
  datePublished: string
  dateModified: string
}

@Injectable({
  providedIn: 'root',
})
export class StructuredDataService {
  nextElem = 0

  constructor(@Inject(DOCUMENT) private document: Document) {}

  addBreadcrumb(breadcrumbs: BreadCrumb[]): number {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((breadcrumb) => ({
        '@type': 'ListItem',
        position: breadcrumb.position,
        name: breadcrumb.name,
        item: breadcrumb.item,
      })),
    }

    return this.addDataToHead(JSON.stringify(data))
  }

  addWebSite(): number {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://verseghy-gimnazium.net/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://verseghy-gimnazium.net/search/term/{search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    }

    return this.addDataToHead(JSON.stringify(data))
  }

  addArticle(article: Article): number {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.headline,
      image: article.images,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
    }

    return this.addDataToHead(JSON.stringify(data))
  }

  private addDataToHead(data: string): number {
    const nextElem = this.nextElem
    this.nextElem++

    const script = this.document.createElement('script')
    script.setAttribute('type', 'application/ld+json')
    script.textContent = data

    script.id = `structured-data-${nextElem}`
    this.document.head.appendChild(script)

    return nextElem
  }

  removeStructuredData(id: number) {
    this.document.getElementById(`structured-data-${id}`)?.remove()
  }
}
