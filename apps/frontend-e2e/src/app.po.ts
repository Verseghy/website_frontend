import { browser, by, element } from 'protractor'

export class AppPage {
  static navigateTo() {
    return browser.get('/')
  }

  static getParagraphText() {
    return element(by.css('verseghy-root h1')).getText()
  }
}
