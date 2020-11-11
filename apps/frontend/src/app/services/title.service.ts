import { Injectable } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private _titlePrefix = 'Verseghy Ferenc Gimnázium'

  public constructor(private titleService: Title) {}

  setTitle(title: string): void {
    if (title) {
      this.titleService.setTitle(this._titlePrefix + ' - ' + title)
    } else {
      this.titleService.setTitle(this._titlePrefix)
    }
  }
}
