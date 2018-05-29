import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GestureConfig } from '@angular/material/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../../material.module';
import { PostsComponent } from './posts.component';

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
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
  declarations: [PostsComponent],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
})
export class PostsModule {}
