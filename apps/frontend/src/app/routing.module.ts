import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'posts',
    loadChildren: () => import('./modules/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'misc',
    loadChildren: () => import('./modules/misc/misc.module').then((m) => m.MiscModule),
  },
  {
    path: 'events',
    loadChildren: () => import('./modules/events/events.module').then((m) => m.EventsModule),
  },
  {
    path: 'canteen',
    loadChildren: () => import('./modules/canteen/canteen.module').then((m) => m.CanteenModule),
  },
  {
    path: 'archive',
    loadChildren: () => import('./modules/archive/archive.module').then((m) => m.ArchiveModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./modules/pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'information',
    loadChildren: () => import('./modules/information/information.module').then((m) => m.InformationModule),
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 70],
      scrollPositionRestoration: 'top',
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class RoutingModule {}
