import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ElectronService } from './services/electron.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewProjectModalComponent } from './modals/new-project-modal/new-project-modal.component';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { appStoreProviders } from './redux/app.store';
import { DbService } from './services/db.service';
import { ProjectPaneComponent } from './components/project-pane/project-pane.component';
import { ClientPaneComponent } from './components/client-pane/client-pane.component';
import { MessageLogComponent } from './components/message-log/message-log.component';
import { QuickSendBarComponent } from './components/quick-send-bar/quick-send-bar.component';
import { ServersTabComponent } from './components/servers-tab/servers-tab.component';
import { MessagesTabComponent } from './components/messages-tab/messages-tab.component';
import { NewServerModalComponent } from './modals/new-server-modal/new-server-modal.component';
import { WebSocketService } from './services/web-socket.service';
import { NewMessageModalComponent } from './modals/new-message-modal/new-message-modal.component';
import { FocusDirective } from './directives/focus.directive';
import { BytesPipe } from './pipes/bytes.pipe';
import { BeautifyJsonPipe } from './pipes/beautify-json.pipe';
import { LogDataComponent } from './components/log-data/log-data.component';
import { ErrorModalService } from './services/error-modal.service';
import { SelectPortModalComponent } from './modals/select-port-modal/select-port-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NewProjectModalComponent,
    ErrorModalComponent,
    ProjectPaneComponent,
    ClientPaneComponent,
    MessageLogComponent,
    QuickSendBarComponent,
    ServersTabComponent,
    MessagesTabComponent,
    NewServerModalComponent,
    NewMessageModalComponent,
    FocusDirective,
    BytesPipe,
    BeautifyJsonPipe,
    LogDataComponent,
    SelectPortModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  providers: [
    ElectronService,
    appStoreProviders,
    DbService,
    WebSocketService,
    ErrorModalService,
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    NewProjectModalComponent,
    NewServerModalComponent,
    NewMessageModalComponent,
    ErrorModalComponent,
    SelectPortModalComponent,
  ]
})
export class AppModule { }
