import { TestBed, waitForAsync } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { RouterTestingModule } from '@angular/router/testing'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'
import { Observable } from 'rxjs'

@Component({ selector: 'verseghy-header', template: '', styles: [], changeDetection: ChangeDetectionStrategy.OnPush })
class HeaderComponent {}
@Component({ selector: 'verseghy-footer', template: '', styles: [], changeDetection: ChangeDetectionStrategy.OnPush })
class FooterComponent {}
@Component({ selector: 'verseghy-loaders', template: '', styles: [], changeDetection: ChangeDetectionStrategy.OnPush })
class LoadersComponent {
  @Input() loader
  @Input() loaderClass
}

const SwUpdateMock = {
  available: new Observable(),
  activateUpdate: new Promise(() => {}),
}

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent, HeaderComponent, FooterComponent, LoadersComponent],
        providers: [
          {
            provide: SwUpdate,
            useValue: SwUpdateMock,
          },
        ],
      }).compileComponents()
    })
  )

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })
})
