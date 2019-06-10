import { async, TestBed } from '@angular/core/testing'

import { ProblemComponent } from './problem.component'
import { MdcButtonModule, MdcTextFieldModule } from '@angular-mdc/web'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { Component, ViewChild } from '@angular/core'
import { Problem } from '../../reducers/problem/problem.reducer'

@Component({
  selector: 'verseghy-test-component',
  template: `
    <verseghy-problem [problem]="problem"></verseghy-problem>
  `,
})
class TestComponent {
  @ViewChild(ProblemComponent, { static: true }) public problemComponent: ProblemComponent
  problem: Problem = {
    image: false,
    id: '0',
    text: '',
  }
}

const AngularFirestoreStub = {
  collection() {},
}
const AngularFireAuthStub = {}
const AngularFirestorageStub = {}

describe('ProblemComponent', () => {
  let component: ProblemComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, ProblemComponent],
      imports: [MdcButtonModule, MdcTextFieldModule, StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: AngularFireStorage, useValue: AngularFirestorageStub },
      ],
    }).compileComponents()
  })

  beforeEach(async () => {
    const testfixture = TestBed.createComponent(TestComponent)
    const testcomponent = testfixture.componentInstance
    component = testcomponent.problemComponent
    testfixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
