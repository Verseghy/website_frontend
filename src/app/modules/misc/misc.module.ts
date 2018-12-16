import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsComponent } from './components/authors/authors.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { ArchiveComponent } from './components/archive/archive.component';
import { HistoryComponent } from './components/history/history.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ColleaguesComponent } from './components/colleagues/colleagues.component';

library.add(faGithub, faLinkedin, faFileAlt);

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
  {
    path: 'documents',
    component: DocumentsComponent,
  },
  {
    path: 'archive',
    component: ArchiveComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'classes',
    component: ClassesComponent,
  },
  {
    path: 'colleagues',
    component: ColleaguesComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  declarations: [
    AuthorsComponent,
    DocumentsComponent,
    ArchiveComponent,
    HistoryComponent,
    ClassesComponent
  ]
})
export class MiscModule {
}
