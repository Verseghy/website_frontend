import { browser, by, element } from 'protractor'

describe('math-competition homepage', () => {
  it('should load the homepage', async () => {
    await browser.get('http://localhost:4200')

    const logintext = element(by.css('.logintext'))

    await expect(logintext.getText()).toEqual('Bejelentkezés')
  })
})
