import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class InformationFacade {
  loadedMenu$: Observable<boolean>
  loadedPage$: Observable<boolean>
  error$: Observable<any>
  menu$: Observable<any>
  page$: Observable<any>

  constructor() {}

  queryMenu(): void {
  }

  queryPageBySlug(slug: string): void {
  }
}
