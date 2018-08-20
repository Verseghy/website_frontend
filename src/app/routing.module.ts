import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/home/home.module#HomeModule',
  },
  {
    path: 'posts',
    loadChildren: './modules/posts/posts.module#PostsModule',
  },
  {
    path: 'misc',
    loadChildren: './modules/misc/misc.module#MiscModule',
  },
  {
    path: 'events',
    loadChildren: './modules/events/events.module#EventsModule',
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class RoutingModule { }
