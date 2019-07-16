import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MoreDetailsDialogComponent } from './more-details-dialog.component'

describe('MoreDetailsDialogComponent', () => {
  let component: MoreDetailsDialogComponent
  let fixture: ComponentFixture<MoreDetailsDialogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoreDetailsDialogComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreDetailsDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
