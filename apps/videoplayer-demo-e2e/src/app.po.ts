import { browser, by, element } from 'protractor'

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>
  }

  getTitleText() {
    return element(by.css('verseghy-root h1')).getText() as Promise<string>
  }
}
