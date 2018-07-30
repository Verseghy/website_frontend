import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorsComponent} from './components/authors/authors.component';
import {RouterModule, Routes} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';

library.add(faGithub, faLinkedin);

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: 'authors',
    component: AuthorsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  declarations: [AuthorsComponent]
})
export class MiscModule {
}
