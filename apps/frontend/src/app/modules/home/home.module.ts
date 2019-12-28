import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from '../shared/shared.module'

import { HomeComponent } from './components/home/home.component'
import { CardComponent } from './components/card/card.component'
import { FeaturedPostComponent } from './components/featured-post/featured-post.component';
import { StoreModule } from '@ngrx/store';
import * as fromPosts from './state/posts/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/posts/posts.effects'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule, SharedModule, StoreModule.forFeature(fromPosts.postsFeatureKey, fromPosts.reducer), EffectsModule.forFeature([PostsEffects])],
  declarations: [HomeComponent, CardComponent, FeaturedPostComponent],
})
export class HomeModule {}
