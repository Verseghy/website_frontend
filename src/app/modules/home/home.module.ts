import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../../material.module';
import { HomeComponent } from './home.component';
import { CardComponent } from './components/card/card.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
  declarations: [HomeComponent, CardComponent],
})
export class HomeModule {}
