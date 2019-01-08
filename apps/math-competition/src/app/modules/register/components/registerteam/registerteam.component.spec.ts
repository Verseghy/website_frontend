import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RegisterteamComponent } from './registerteam.component'
import { RouterTestingModule } from '@angular/router/testing'
import { MdcButtonModule, MdcFormFieldModule, MdcTextFieldModule } from '@angular-mdc/web'
import { ReactiveFormsModule } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'

describe('RegisterteamComponent', () => {
  let component: RegisterteamComponent
  let fixture: ComponentFixture<RegisterteamComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MdcTextFieldModule,
        MdcFormFieldModule,
        MdcButtonModule
      ],
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireStub},
        { provide: AngularFirestore, useValue: AngularFirestoreStub}
      ],
      declarations: [RegisterteamComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterteamComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

const AngularFirestoreStub = {
  collection() { return {
    doc() { return {
      get() { return {
        subscribe() {}
      }}
    }}
  }}
};
const AngularFireStub = {};
