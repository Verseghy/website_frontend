import { browser, by, element } from 'protractor'

describe('frontend homepage', () => {
  it('should load the homepage', async () => {
    await browser.get('http://localhost:4200')

    const verseghytext = element(by.css('h1'))

    await expect(verseghytext.getText()).toEqual('VERSEGHY')
  })
})
