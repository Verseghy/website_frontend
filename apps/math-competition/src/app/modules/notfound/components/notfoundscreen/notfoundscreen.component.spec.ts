import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { NotfoundscreenComponent } from './notfoundscreen.component'

describe('NotfoundscreenComponent', () => {
  let component: NotfoundscreenComponent
  let fixture: ComponentFixture<NotfoundscreenComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotfoundscreenComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfoundscreenComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
