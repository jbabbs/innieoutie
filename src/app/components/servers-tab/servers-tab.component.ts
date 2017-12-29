import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewServerModalComponent } from '../../modals/new-server-modal/new-server-modal.component';
import { AppState } from '../../redux/app.reducer';
import { Store } from 'redux';
import { AppStore } from '../../redux/app.store';
import { DbService } from '../../services/db.service';
import { WebSocketService } from '../../services/web-socket.service';
import { IServer } from '../../db/server.interface';

@Component({
  selector: 'app-servers-tab',
  templateUrl: './servers-tab.component.html',
  styleUrls: ['./servers-tab.component.scss']
})
export class ServersTabComponent implements OnInit, OnDestroy {
  public servers: Array<any> = [];
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

  onEditServerClick(oldServer: IServer) {
    const modalRef = this.modalService.open(NewServerModalComponent, {size: 'lg'});
    modalRef.componentInstance.title = 'Edit Server';
    modalRef.componentInstance.initial = oldServer;
    modalRef.result.then(
      newMessage => {
        // make sure to keep same id
        const c2 = Object.assign({}, oldServer, newMessage);
        this.dbService.updateServer(c2);
      }
    ).catch(err => {  });
  }

  onConnectClick(server) {
    this.wsService.createClientAndConnect(server);
  }

  onDeleteServerClick(server) {
    this.dbService.deleteServer(server.id);
  }

  onStateChange() {
    const state = this.store.getState();
    if (!state.currentProject) {
      this.servers = [];
    } else {
      this.servers = state.currentProject.servers;
    }
  }
}
