import { browser, by, element } from 'protractor'

export class AppPage {
  navigateTo() {
    return browser.get('/')
  }

  getTitleText() {
    return element(by.css('verseghy-root h1')).getText()
  }
}
