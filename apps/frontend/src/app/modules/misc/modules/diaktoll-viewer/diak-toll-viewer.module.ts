import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ViewerComponent } from './components/viewer/viewer.component'
import { RouterModule, Routes } from '@angular/router'
import { PdfViewerModule } from 'ng2-pdf-viewer'

const routes: Routes = [
  {
    path: '',
    component: ViewerComponent,
  },
]

@NgModule({
  declarations: [ViewerComponent],
  imports: [CommonModule, RouterModule.forChild(routes), PdfViewerModule],
})
export class DiakTollViewerModule {}
