import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WaitingComponent } from './waiting.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{ path: '', component: WaitingComponent }]

@NgModule({
  declarations: [WaitingComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WaitingModule {}
