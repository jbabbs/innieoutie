import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ElectronService } from './services/electron.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from './services/db/database.service';
import { NoProjectComponent } from './components/no-project/no-project.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { ProjectDBService } from './services/db/project-db.service';
import { CurrentProjectService } from './services/current-project.service';

@NgModule({
  declarations: [
    AppComponent,
    NoProjectComponent,
    ProjectComponent,
    ProjectModalComponent,
    ErrorModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  providers: [
    ElectronService,
    DatabaseService,
    ProjectDBService,
    CurrentProjectService,
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ProjectModalComponent,
    ErrorModalComponent,
  ]
})
export class AppModule { }
