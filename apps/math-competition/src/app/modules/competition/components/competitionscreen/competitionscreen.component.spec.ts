import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CompetitionscreenComponent } from './competitionscreen.component'
import { RouterTestingModule } from '@angular/router/testing'
import { Component, Input } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { provideMockStore } from '@ngrx/store/testing'

@Component({ selector: 'verseghy-problem', template: '', styles: [] })
class ProblemComponent {
  @Input() problem
}

const AngularFirestoreStub = {
  collection() {},
}
const AngularFireAuthStub = {}

describe('CompetitionscreenComponent', () => {
  let component: CompetitionscreenComponent
  let fixture: ComponentFixture<CompetitionscreenComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CompetitionscreenComponent, ProblemComponent],
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        provideMockStore({
          initialState: {
            competition: {
              problem: {
                ids: [],
              },
            },
          },
        }),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionscreenComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
