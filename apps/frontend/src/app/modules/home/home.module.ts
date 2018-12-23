import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";

import { HomeComponent } from "./components/home/home.component";
import { CardComponent } from "./components/card/card.component";
import { FeaturedPostComponent } from "./components/featured-post/featured-post.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    CardComponent,
    FeaturedPostComponent
  ],
})
export class HomeModule { }
