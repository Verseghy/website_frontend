import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { CardComponent } from './components/card/card.component';
import { FeaturedPostComponent } from './components/featured-post/featured-post.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent, CardComponent, FeaturedPostComponent],
})
export class HomeModule { }
