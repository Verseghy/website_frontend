import { async, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { RouterTestingModule } from '@angular/router/testing'
import { Component, Input } from '@angular/core'

@Component({ selector: 'verseghy-header', template: '', styles: [] })
class HeaderComponent {}
@Component({ selector: 'verseghy-footer', template: '', styles: [] })
class FooterComponent {}
@Component({ selector: 'verseghy-loaders', template: '', styles: [] })
class LoadersComponent {
  @Input() loader
  @Input() loaderClass
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, HeaderComponent, FooterComponent, LoadersComponent],
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })
})
