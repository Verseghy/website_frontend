import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LabelComponent } from './components/label/label.component'
import { RecentPostsComponent } from './components/recent-posts/recent-posts.component'
import { CardComponent } from './components/card/card.component'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [LabelComponent, RecentPostsComponent, CardComponent],
  declarations: [LabelComponent, RecentPostsComponent, CardComponent],
})
export class SharedModule {}
