import { Inject, Injectable } from '@angular/core';
import { Store } from 'redux';
import { AppState } from '../redux/app.reducer';
import { AppStore } from '../redux/app.store';
import { IConnection } from '../db/connection.interface';
import { Client } from '../redux/client/client.model';
import { WebSocketSubjectConfig } from 'rxjs/observable/dom/WebSocketSubject';
import {
  connectClient, createClient, receiveMessage, sendMessage, clientOpened, closeClient, removeClient, reconnectClient
} from '../redux/client/client.actions';
import { webSocket } from 'rxjs/observable/dom/webSocket';

@Injectable()
export class WebSocketService {

  constructor(
    @Inject(AppStore) private store: Store<AppState> | null
  ) { }

  _constructSocket(url, proto, clientId) {
    // const config: WebSocketSubjectConfig = {
    //   url: `ws://${url}`,
    //   protocol: proto,
    //   openObserver: {
    //     next: () => {
    //       this.store.dispatch(clientOpened(clientId));
    //     },
    //     error: () => { }
    //   }
    // }
    //
    // return webSocket<string>(config);
  }

  createClient(connection: IConnection) {
    // const state = this.store.getState();
    // const nextId = state.currentProject.nextClientNumber;
    // const webSocket$ = this._constructSocket(connection.url, connection.protocolString, nextId);
    // const name = `Client ${nextId}`;
    // const client: Client = { webSocket$, name, connection, id: nextId, messages: [] };
    // this.store.dispatch(createClient(client));
    // return client;
  }

  connectClient(client: Client) {
    // const clientId: number = client.id;
    // client.webSocket$.subscribe(msg => {
    //   this.store.dispatch(receiveMessage(client.id, msg));
    // }, err => {
    //   console.error('err on socket: ', err);
    // }, () => {
    //   //console.log('client complete');
    // });
    // this.store.dispatch(connectClient({clientId}));
  }

  // connectClosedClient(client: Client) {
  //   const { connection } = client;
  //   const webSocket$ = this._constructSocket(connection.url, connection.protocolString, client.id);
  //   this.store.dispatch(reconnectClient(webSocket$, client.id));
  // }

  createClientAndConnect(connection: IConnection) {
    // const client: Client = this.createClient(connection);
    // this.connectClient(client);
  }

  sendMessage(message: string, client: Client) {
    // client.webSocket$.next(JSON.stringify(message));
    // this.store.dispatch(sendMessage(client.id, message));
  }

  disconnectClient(client: Client) {
    // client.webSocket$.unsubscribe();
    // this.store.dispatch(closeClient(client.id));
  }

  disconnectClientAndRemove(client: Client) {
    // this.disconnectClient(client);
    // this.store.dispatch((removeClient(client.id)));
  }
}
