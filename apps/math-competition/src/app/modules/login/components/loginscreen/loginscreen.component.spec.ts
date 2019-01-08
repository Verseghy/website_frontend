import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginscreenComponent } from './loginscreen.component'
import { MdcButtonModule, MdcFormFieldModule, MdcTextFieldModule } from '@angular-mdc/web'
import { ReactiveFormsModule } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { RouterTestingModule } from '@angular/router/testing'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

const AngularFirestoreStub = {
  collection() {},
}
const AngularFireAuthStub = {}

describe('LoginscreenComponent', () => {
  let component: LoginscreenComponent
  let fixture: ComponentFixture<LoginscreenComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginscreenComponent],
      imports: [
        RouterTestingModule,
        MdcTextFieldModule,
        MdcFormFieldModule,
        ReactiveFormsModule,
        MdcButtonModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
      ],
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
