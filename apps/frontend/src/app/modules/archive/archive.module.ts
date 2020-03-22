import { NgModule } from '@angular/core'
import { ArchiveRoutingModule } from './archive-routing.module'
import { ArchiveScreenComponent } from './archive-screen.component'
import { MatExpansionModule } from '@angular/material/expansion'
import { StoreModule } from '@ngrx/store'
import * as fromArchive from './state/archive.reducer'
import { EffectsModule } from '@ngrx/effects'
import { ArchiveEffects } from './state/archive.effects'
import { CommonModule } from '@angular/common'
import { LoadersModule } from '@verseghy/ui'

@NgModule({
  declarations: [ArchiveScreenComponent],
  imports: [
    CommonModule,
    ArchiveRoutingModule,
    MatExpansionModule,
    StoreModule.forFeature(fromArchive.archiveFeatureKey, fromArchive.reducer),
    EffectsModule.forFeature([ArchiveEffects]),
    LoadersModule,
  ],
})
export class ArchiveModule {}
