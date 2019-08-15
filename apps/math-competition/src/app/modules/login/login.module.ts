import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginscreenComponent } from './components/loginscreen/loginscreen.component'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [
  {
    path: '',
    component: LoginscreenComponent,
  },
]

@NgModule({
  declarations: [LoginscreenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
})
export class LoginModule {}
