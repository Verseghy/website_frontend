import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LabelComponent } from './components/label/label.component'
import { RecentPostsComponent } from './components/recent-posts/recent-posts.component'

@NgModule({
  imports: [CommonModule],
  exports: [LabelComponent, RecentPostsComponent],
  declarations: [LabelComponent, RecentPostsComponent],
})
export class SharedModule {}
