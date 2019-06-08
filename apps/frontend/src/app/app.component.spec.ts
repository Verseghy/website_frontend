import { async, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { RouterTestingModule } from '@angular/router/testing'
import { Component } from '@angular/core'
import { LoadersCssComponent } from 'angular2-loaders-css/module/loaders-css.component'

@Component({ selector: 'verseghy-header', template: '', styles: [] })
class HeaderComponent {}
@Component({ selector: 'verseghy-footer', template: '', styles: [] })
class FooterComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, HeaderComponent, FooterComponent, LoadersCssComponent],
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })
})
