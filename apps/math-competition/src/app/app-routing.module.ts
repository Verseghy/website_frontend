import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'
import { LandingComponent } from './components/landing/landing.component'

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'competition',
    loadChildren: () => import('./modules/competition/competition.module').then(m => m.CompetitionModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LandingComponent, // TODO(TwoDCube): create not-found page
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
