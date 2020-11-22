import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'
import { LandingComponent } from './components/landing/landing.component'
import { TimeGuard } from './guards/time.guard'
import { IfNotAdminRedirectGuard } from './guards/if-not-admin-redirect.guard'
import { IfAdminRedirectGuard } from './guards/if-admin-redirect.guard'

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [TimeGuard, AuthGuard],
  },
  {
    path: 'competition',
    loadChildren: () => import('./modules/competition/competition.module').then((m) => m.CompetitionModule),
    canActivate: [IfAdminRedirectGuard, TimeGuard, AuthGuard],
  },
  {
    path: 'waiting',
    loadChildren: () => import('./modules/waiting/waiting.module').then((m) => m.WaitingModule),
    canActivate: [IfAdminRedirectGuard, TimeGuard, AuthGuard],
  },
  {
    path: 'end',
    loadChildren: () => import('./modules/end/end.module').then((m) => m.EndModule),
    canActivate: [IfAdminRedirectGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [IfNotAdminRedirectGuard],
  },
  {
    path: '**',
    component: LandingComponent, // TODO(zoltanszepesi): create not-found page
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
