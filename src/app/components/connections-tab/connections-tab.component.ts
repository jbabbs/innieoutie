import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewConnectionModalComponent } from '../../modals/new-connection-modal/new-connection-modal.component';
import { AppState } from '../../redux/app.reducer';
import { Store } from 'redux';
import { AppStore } from '../../redux/app.store';
import { DbService } from '../../services/db.service';
import { WebSocketService } from '../../services/web-socket.service';
import { IConnection } from '../../db/connection.interface';

@Component({
  selector: 'app-connections-tab',
  templateUrl: './connections-tab.component.html',
  styleUrls: ['./connections-tab.component.scss']
})
export class ConnectionsTabComponent implements OnInit, OnDestroy {
  public connections: Array<any> = [];
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

  onNewConnectionClick() {
    this.modalService.open(NewConnectionModalComponent, {size: 'lg'}).result.then(
      connection => {
        this.dbService.addConnectionToCurrentProject(connection);
      }
    ).catch(err => {  });
  }

  onEditConnectionClick(oldMessage: IConnection) {
    const modalRef = this.modalService.open(NewConnectionModalComponent, {size: 'lg'});
    modalRef.componentInstance.title = 'Edit Connection';
    modalRef.componentInstance.initial = {
      name: oldMessage.name,
      protocol: oldMessage.protocolString,
      url: oldMessage.url
    };
    modalRef.result.then(
      newMessage => {
        // make sure to keep same id
        const c2 = Object.assign({}, oldMessage, newMessage);
        this.dbService.updateConnection(c2);
      }
    ).catch(err => {  });
  }

  onConnectClick(connection) {
    this.wsService.createClientAndConnect(connection);
  }

  onDeleteConnectionClick(connection) {
    this.dbService.deleteConnection(connection.id);
  }

  onStateChange() {
    const state = this.store.getState();
    if (!state.currentProject) {
      this.connections = [];
    } else {
      this.connections = state.currentProject.connections;
    }
  }
}
