import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'
import { LandingComponent } from './components/landing/landing.component';

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
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [],
  },
  {
    path: 'after',
    loadChildren: () => import('./modules/after/after.module').then(m => m.AfterModule),
    canActivate: [],
  },
  {
    path: 'competition',
    loadChildren: () => import('./modules/competition/competition.module').then(m => m.CompetitionModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () => import('./modules/notfound/notfound.module').then(m => m.NotfoundModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
