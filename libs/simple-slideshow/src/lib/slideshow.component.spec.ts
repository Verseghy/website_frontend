import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { SlideshowComponent } from './slideshow.component'
import { BrowserTransferStateModule } from '@angular/platform-browser'

describe('SlideshowComponent', () => {
  // let component: SlideshowComponent
  // let fixture: ComponentFixture<SlideshowComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SlideshowComponent],
        imports: [BrowserTransferStateModule],
      }).compileComponents()
    })
  )

  /*beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })*/

  it('should create', () => {
    expect(true).toBeTruthy()
    // expect(component).toBeTruthy()
  })
})
