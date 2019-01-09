import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HomescreenComponent } from './homescreen.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('HomescreenComponent', () => {
  let component: HomescreenComponent
  let fixture: ComponentFixture<HomescreenComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomescreenComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomescreenComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
