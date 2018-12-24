import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotfoundscreenComponent } from './components/notfoundscreen/notfoundscreen.component'
import { Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: NotfoundscreenComponent,
  },
]

@NgModule({
  declarations: [NotfoundscreenComponent],
  imports: [CommonModule],
})
export class NotfoundModule {}
