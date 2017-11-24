import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AppStore } from '../../redux/app.store';
import { Store } from 'redux';
import { AppState } from '../../redux/app.reducer';
import { Client } from '../../redux/client/client.model';
import { formatTimeSince } from '../../utils/time';
import { WebSocketService } from '../../services/web-socket.service';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { setSelectedClientTab } from '../../redux/project/project.actions';

@Component({
  selector: 'app-client-pane',
  templateUrl: './client-pane.component.html',
  styleUrls: ['./client-pane.component.scss']
})
export class ClientPaneComponent implements OnInit {
  public clients: Array<Client> = [];
  private storeUnsubscribe: Function;

  constructor(
    @Inject(AppStore) private store: Store<AppState> | null,
    private wsService: WebSocketService,
    private changes: ChangeDetectorRef,
  ) {
    this.storeUnsubscribe = store.subscribe(() => this.onStateChange());
  }

  ngOnInit() {
    setInterval(() => {
      this.changes.detectChanges();
    }, 75);
  }

  onStateChange() {
    const state = this.store.getState();
    if (state.currentProject) {
      this.clients = state.currentProject.clients;
    } else {
      this.clients = [];
    }
  }

  getActiveTabId() {
    const state = this.store.getState();
    return `client-tab-${state.currentProject.activeClientTabIdx}`;
  }

  onTabChange(event: NgbTabChangeEvent) {
    const lastHyphen = event.nextId.lastIndexOf('-');
    const idxString = event.nextId.slice(lastHyphen + 1);
    const idx = parseInt(idxString, 10);
    this.store.dispatch(setSelectedClientTab(idx));
  }

  getConnectionStateColor(client: Client) {
    if (!client.webSocket$.socket) {
      return 'transparent';
    }
    switch (client.webSocket$.socket.readyState) {
      case WebSocket.CONNECTING: return 'yellow';
      case WebSocket.OPEN: return 'green';
      case WebSocket.CLOSING: return 'yellow';
      case WebSocket.CLOSED: return 'transparent';
      default: return 'UNKNOWN';
    }
  }

  getClientStateText(client: Client) {
    if (!client.webSocket$.socket) {
      return 'Not Connected';
    }
    switch (client.webSocket$.socket.readyState) {
      case WebSocket.CONNECTING: return 'Connecting...';
      case WebSocket.OPEN: return 'Connected';
      case WebSocket.CLOSING: return 'Closing...';
      case WebSocket.CLOSED: return 'Not Connected';
      default: return 'UNKNOWN';
    }
  }


  getClientUptime(client: Client) {
    if (!client.webSocket$.socket) {
      return '';
    }
    switch (client.webSocket$.socket.readyState) {
      case WebSocket.CONNECTING: return '0.000';
      case WebSocket.OPEN: return formatTimeSince(client.connectedAtTime);
      default: return '';
    }
  }

  onDisconnectClick(client: Client) {
    this.wsService.disconnectClient(client);
  }

  onConnectClick(client: Client) {
    this.wsService.connectClient(client);
  }

  shouldShowDisconnect(client: Client) {
    if (!client.webSocket$.socket) {
      return false;
    }
    const readyState = client.webSocket$.socket.readyState
    return readyState === WebSocket.CLOSING || readyState === WebSocket.OPEN || readyState === WebSocket.CONNECTING;
  }

  shouldShowConnect(client: Client) {
    if (!client.webSocket$.socket) {
      return true;
    }
    const readyState = client.webSocket$.socket.readyState
    return readyState === WebSocket.CLOSED;
  }

  onTabCloseClick(client: Client, $event) {
    $event.preventDefault();
    this.wsService.disconnectClientAndRemove(client);
  }
}
