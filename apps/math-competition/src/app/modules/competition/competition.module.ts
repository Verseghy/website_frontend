import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CompetitionscreenComponent } from "./components/competitionscreen/competitionscreen.component";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { RouterModule, Routes } from "@angular/router";
import { ProblemComponent } from "./components/problem/problem.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ProblemEffects } from "./reducers/problem/problem.effects";
import { competitionReducers } from "./reducers";
import { MdcButtonModule, MdcTextFieldModule } from "@angular-mdc/web";
import { SolutionEffects } from "./reducers/solution/solution.effects";
import { AngularFireStorageModule } from "@angular/fire/storage";

const routes: Routes = [
  {
    path: '',
    component: CompetitionscreenComponent
  }
];

@NgModule({
  declarations: [CompetitionscreenComponent, ProblemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('competition', competitionReducers),
    EffectsModule.forFeature([ProblemEffects, SolutionEffects]),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MdcButtonModule,
    MdcTextFieldModule
  ]
})
export class CompetitionModule { }
