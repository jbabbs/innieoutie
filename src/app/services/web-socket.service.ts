import { Inject, Injectable } from '@angular/core';
import { Store } from 'redux';
import { AppState } from '../redux/app.reducer';
import { AppStore } from '../redux/app.store';
import { IConnection } from '../db/connection.interface';
import { Client } from '../redux/client/client.model';
import { WebSocketSubjectConfig } from 'rxjs/observable/dom/WebSocketSubject';
import { connectClient, createClient, receiveMessage, sendMessage } from '../redux/client/client.actions';
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
    const client: Client = { webSocket$, name, config, connection, id: nextId, messages: [] };
    this.store.dispatch(createClient(client));
    return client;
  }

  connectClient(client: Client) {
    const clientId: number = client.id;
    const subscription = client.webSocket$.subscribe(msg => {
      this.store.dispatch(receiveMessage(client.id, msg));
    }, err => {
      console.error('err on socket: ', err);
    });
    this.store.dispatch(connectClient({subscription, clientId}));
  }

  createClientAndConnect(connection: IConnection) {
    const client: Client = this.createClient(connection);
    this.connectClient(client);
  }

  sendMessage(message: string, client: Client) {
    client.webSocket$.next(JSON.stringify(message));
    this.store.dispatch(sendMessage(client.id, message));
  }
}
