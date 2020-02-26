import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../shared/shared.module'

import { PostsComponent } from './components/posts/posts.component'
import { RequestService } from './services/request.service'
import { SlideshowModule } from '@verseghy/simple-slideshow'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: PostsComponent,
  },
  {
    path: 'preview/:id',
    component: PostsComponent,
  },
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, SlideshowModule],
  declarations: [PostsComponent],
  providers: [RequestService],
})
export class PostsModule {}
