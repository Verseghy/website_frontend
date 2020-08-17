import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { MainLayoutComponent } from './components/main-layout/main-layout.component'
import { EmptyLayoutComponent } from './components/empty-layout/empty-layout.component'

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'posts',
        loadChildren: () => import('./modules/posts/posts.module').then(m => m.PostsModule),
      },
      {
        path: 'misc',
        loadChildren: () => import('./modules/misc/misc.module').then(m => m.MiscModule),
      },
      {
        path: 'events',
        loadChildren: () => import('./modules/events/events.module').then(m => m.EventsModule),
      },
      {
        path: 'canteen',
        loadChildren: () => import('./modules/canteen/canteen.module').then(m => m.CanteenModule),
      },
      {
        path: 'archive',
        loadChildren: () => import('./modules/archive/archive.module').then(m => m.ArchiveModule),
      },
    ]
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: []
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 70],
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class RoutingModule {}
