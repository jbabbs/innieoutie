import { Inject, Injectable } from '@angular/core';
import { Store } from 'redux';
import { AppState } from '../redux/app.reducer';
import { AppStore } from '../redux/app.store';
import { IConnection } from '../db/connection.interface';
import { Client } from '../redux/client/client.model';
import {
  createClient, receiveMessage, sendMessage, clientOpened, closeClient, removeClient, reconnectClient
} from '../redux/client/client.actions';

@Injectable()
export class WebSocketService {
  constructor(
    @Inject(AppStore) private store: Store<AppState> | null
  ) { }

  reconnectClient(client: Client) {
    const connection = client.connection;
    const id = client.id;
    const url = `ws://${connection.url}`;
    const socket = new WebSocket(url, connection.protocolString || undefined);
    socket.onopen = () => {
      this.store.dispatch(clientOpened(id));
    };
    socket.onmessage = (msg: MessageEvent) => {
      this.store.dispatch(receiveMessage(id, msg.data));
    }
    this.store.dispatch(reconnectClient(socket, id));
  }

  createClientAndConnect(connection: IConnection) {
    const state = this.store.getState();
    const id = state.nextClientNumber;
    const name = `Client ${id}`;
    const url = `ws://${connection.url}`;
    const socket = new WebSocket(url, connection.protocolString || undefined);
    socket.onopen = () => {
      this.store.dispatch(clientOpened(id));
    };
    socket.onmessage = (msg: MessageEvent) => {
      this.store.dispatch(receiveMessage(id, msg.data));
    }
    const client: Client = { socket, name, connection, id, messages: [] };
    this.store.dispatch(createClient(client));
  }

  sendMessage(message: string, client: Client) {
    client.socket.send(message);
    this.store.dispatch(sendMessage(client.id, message));
  }

  disconnectClient(client: Client) {
    client.socket.onclose = () => {
      this.store.dispatch(closeClient(client.id));
    }
    client.socket.close();
  }

  disconnectClientAndRemove(client: Client) {
    this.disconnectClient(client);
    this.store.dispatch((removeClient(client.id)));
  }
}
