import { async, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { RouterTestingModule } from '@angular/router/testing'
import { LoadingBarRouterModule } from '@ngx-loading-bar/router'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, LoadingBarRouterModule],
      declarations: [AppComponent],
    })
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })
})
