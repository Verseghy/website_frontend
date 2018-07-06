import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';

import { PostsComponent } from './posts.component';
import { RequestService } from './services/request.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: PostsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [PostsComponent],
  providers: [RequestService]
})
export class PostsModule { }
