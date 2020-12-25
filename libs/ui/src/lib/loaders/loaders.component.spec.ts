import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { LoadersComponent } from './loaders.component'

describe('LoadersComponent', () => {
  let component: LoadersComponent
  let fixture: ComponentFixture<LoadersComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadersComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
