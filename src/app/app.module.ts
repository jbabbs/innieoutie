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
import { NoProjectComponent } from './components/no-project/no-project.component';
import { MainComponent } from './components/main/main.component';
import { NewProjectModalComponent } from './components/new-project-modal/new-project-modal.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { appStoreProviders } from './redux/app.store';
import { DbService } from './services/db.service';

@NgModule({
  declarations: [
    AppComponent,
    NoProjectComponent,
    MainComponent,
    NewProjectModalComponent,
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
    appStoreProviders,
    DbService,
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    NewProjectModalComponent,
    ErrorModalComponent,
  ]
})
export class AppModule { }
