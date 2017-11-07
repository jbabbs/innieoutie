import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './services/electron.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from './services/database.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  providers: [
    ElectronService,
    DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
