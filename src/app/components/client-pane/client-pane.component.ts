import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AppStore } from '../../redux/app.store';
import { Store } from 'redux';
import { AppState } from '../../redux/app.reducer';
import { Client } from '../../redux/client/client.model';

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
    private changes: ChangeDetectorRef,
  ) {
    this.storeUnsubscribe = store.subscribe(() => this.onStateChange());
  }

  ngOnInit() {
    setTimeout(() => {
      this.changes.detectChanges();
    }, 1000);
  }

  onStateChange() {
    const state = this.store.getState();
    if (state.currentProject) {
      this.clients = state.currentProject.clients;
    } else {
      this.clients = [];
    }
  }

  getConnectionStateColor(client: Client) {
    //if (client.webSocket$.)
    return 'green';
  }

  getClientUptime(client: Client) {
    if (client.webSocket$.socket.readyState === WebSocket.CONNECTING) {
      return "0.000";
    }
  }
}
