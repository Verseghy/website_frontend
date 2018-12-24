import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginscreenComponent } from './loginscreen.component'

describe('LoginscreenComponent', () => {
  let component: LoginscreenComponent
  let fixture: ComponentFixture<LoginscreenComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginscreenComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginscreenComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
