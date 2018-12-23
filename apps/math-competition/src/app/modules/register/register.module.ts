import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterteamComponent } from "./components/registerteam/registerteam.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MdcButtonModule, MdcFormFieldModule, MdcTextFieldModule } from "@angular-mdc/web";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";

const routes: Routes = [
  {
    path: '',
    component: RegisterteamComponent
  }
];

@NgModule({
  declarations: [RegisterteamComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MdcTextFieldModule,
    MdcFormFieldModule,
    MdcButtonModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ]
})
export class RegisterModule { }
