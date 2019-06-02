import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule',
    canActivate: [],
  },
  {
    path: 'after',
    loadChildren: './modules/after/after.module#AfterModule',
    canActivate: [],
  },
  {
    path: 'competition',
    loadChildren: './modules/competition/competition.module#CompetitionModule',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: './modules/notfound/notfound.module#NotfoundModule',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
