import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LabelComponent } from './components/label/label.component'
import { RecentPostsComponent } from './components/recent-posts/recent-posts.component'
import { CardComponent } from './components/card/card.component'
import { RouterModule } from '@angular/router'
import { PageRendererComponent } from './components/page-renderer/page-renderer.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [LabelComponent, RecentPostsComponent, CardComponent, PageRendererComponent],
  declarations: [LabelComponent, RecentPostsComponent, CardComponent, PageRendererComponent],
})
export class SharedModule {}
