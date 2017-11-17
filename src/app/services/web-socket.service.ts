import { Inject, Injectable } from '@angular/core';
import { Store } from 'redux';
import { AppState } from '../redux/app.reducer';
import { AppStore } from '../redux/app.store';
import { IConnection } from '../db/connection.interface';
import { Client, WebSocketReadyState } from '../redux/client/client.model';
import { WebSocketSubjectConfig } from 'rxjs/observable/dom/WebSocketSubject';
import { connectClient, createClient } from '../redux/client/client.actions';
import { webSocket } from 'rxjs/observable/dom/webSocket';

@Injectable()
export class WebSocketService {

  constructor(
    @Inject(AppStore) private store: Store<AppState> | null
  ) { }

  createClient(connection: IConnection) {
    const state = this.store.getState();
    const config: WebSocketSubjectConfig = {
      url: `ws://${connection.url}`,
      protocol: connection.protocolString,
    }
    const nextId = state.currentProject.nextClientNumber;
    const webSocket$ = webSocket<string>(config);
    const name = `Client ${nextId}`;
    const readyState = WebSocketReadyState.CLOSED;
    const client: Client = { webSocket$, name, readyState, config, connection, id: nextId };
    this.store.dispatch(createClient(client));
    return client;
  }

  createClientAndConnect(connection: IConnection) {
    const client: Client = this.createClient(connection);
    const clientId: number = client.id;
    const readyState = WebSocketReadyState.CONNECTING;
    const subscription = client.webSocket$.subscribe(msg => {
      console.log('response from server: ', msg);
    }, err => {
      console.error('err on socket: ', err);
    });
    this.store.dispatch(connectClient({subscription, clientId, readyState}))
  }

  sendMessage(message: string, client: Client) {
    client.webSocket$.next(JSON.stringify(message));
  }
}
