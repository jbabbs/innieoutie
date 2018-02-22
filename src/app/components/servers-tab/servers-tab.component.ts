import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewServerModalComponent } from '../../modals/new-server-modal/new-server-modal.component';
import { AppState } from '../../redux/app.reducer';
import { Store } from 'redux';
import { AppStore } from '../../redux/app.store';
import { DbService } from '../../services/db.service';
import { WebSocketService } from '../../services/web-socket.service';
import { Server } from '../../redux/server/server.model';
import { NewProjectModalComponent } from '../../modals/new-project-modal/new-project-modal.component';
import { SelectPortModalComponent } from '../../modals/select-port-modal/select-port-modal.component';

@Component({
  selector: 'app-servers-tab',
  templateUrl: './servers-tab.component.html',
  styleUrls: ['./servers-tab.component.scss']
})
export class ServersTabComponent implements OnInit, OnDestroy {
  public servers: Array<Server> = [];
  private storeUnsubscribe;

  constructor(
    private modalService: NgbModal,
    private dbService: DbService,
    private wsService: WebSocketService,
    @Inject(AppStore) private store: Store<AppState> | null
  ) {
  }

  ngOnInit() {
    this.storeUnsubscribe = this.store.subscribe(() => {
      this.onStateChange();
    });
    this.onStateChange();
  }

  ngOnDestroy() {
    this.storeUnsubscribe();
  }

  onNewServerClick() {
    this.modalService.open(NewServerModalComponent, {size: 'lg'}).result.then(
      server => {
        this.dbService.addServerToCurrentProject(server);
      }
    ).catch(err => {  });
  }

  onEditServerClick(oldServer: Server) {
    const modalRef = this.modalService.open(NewServerModalComponent, {size: 'lg'});
    modalRef.componentInstance.title = 'Edit Server';
    modalRef.componentInstance.initial = oldServer;
    modalRef.result.then(
      newMessage => {
        // make sure to keep same id
        const s = Object.assign({}, oldServer, newMessage);
        this.dbService.updateServer(s);
      }
    ).catch(err => {  });
  }

  onNewClientClick(server: Server) {
    this.wsService.createClientAndConnect(server);
  }

  onListenClick(server: Server) {
    const modalRef = this.modalService.open(SelectPortModalComponent);
    modalRef.result.then(portNumber => {
      server.proxyListenPort = portNumber
      this.wsService.proxyListen(server);
      //this.dbService.createProjectAndSetCurrent({ name: projectName, servers: [], messages: []});
    }).catch(err => {
      // modal dismissed
    });
    //this.wsService.proxyListen(server);
  }

  onDeleteServerClick(server) {
    this.dbService.deleteServer(server.id);
  }

  onStateChange() {
    const state = this.store.getState();
    if (!state.currentProject) {
      // This check is necessary because sometimes this tab was being rendered even when the project was deleted
      this.servers = [];
    } else {
      this.servers = state.currentProject.servers;
    }
  }

  shouldDisableListen(server: Server): boolean {
    return !!(server.proxyListenPort || server.proxyServerId);
  }

  getListenAddress(server: Server) {
    return `ws://localhost:${server.proxyListenPort}`;
  }
}
