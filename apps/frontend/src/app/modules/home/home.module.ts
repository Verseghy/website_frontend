import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from '../shared/shared.module'

import { HomeComponent } from './components/home/home.component'
import { FeaturedPostComponent } from './components/featured-post/featured-post.component'
import { StoreModule } from '@ngrx/store'
import * as fromPosts from './state/posts/posts.reducer'
import { EffectsModule } from '@ngrx/effects'
import { PostsEffects } from './state/posts/posts.effects'
import { MatButtonModule } from '@angular/material/button'
import { AlertComponent } from './components/alert/alert.component'
import * as fromAlertMessage from './state/alert-message/alert-message.reducer'
import { AlertMessageEffects } from './state/alert-message/alert-message.effects'
import { AlertMessageFacade } from './state/alert-message/alert-message.facade'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature(fromPosts.postsFeatureKey, fromPosts.reducer),
    EffectsModule.forFeature([PostsEffects]),
    MatButtonModule,
    StoreModule.forFeature(fromAlertMessage.ALERTMESSAGE_FEATURE_KEY, fromAlertMessage.reducer),
    EffectsModule.forFeature([AlertMessageEffects]),
  ],
  declarations: [HomeComponent, FeaturedPostComponent, AlertComponent],
  providers: [AlertMessageFacade],
})
export class HomeModule {}
