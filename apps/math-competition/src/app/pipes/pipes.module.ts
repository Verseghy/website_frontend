import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TexPipe } from './tex.pipe';



@NgModule({
  declarations: [TexPipe],
  imports: [
    CommonModule
  ],
  exports: [TexPipe]
})
export class PipesModule { }
