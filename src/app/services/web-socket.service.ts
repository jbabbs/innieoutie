import { Inject, Injectable } from '@angular/core';
import { Store } from 'redux';
import { AppState } from '../redux/app.reducer';
import { AppStore } from '../redux/app.store';
import { IServer } from '../db/server.interface';
import { Client } from '../redux/client/client.model';
import {
  createClient, receiveMessage, sendMessage, clientOpened, closeClient, removeClient, reconnectClient
} from '../redux/client/client.actions';
import { EchoServerUrl } from '../../constants';

@Injectable()
export class WebSocketService {
  constructor(
    @Inject(AppStore) private store: Store<AppState> | null
  ) { }

  _getServerUrl(server: IServer) {
    if (server.isEchoServer) {
      return EchoServerUrl;
    } else {
      return server.url;
    }
  }

  _attachSocketListeners(socket, clientId) {
    socket.onopen = () => {
      this.store.dispatch(clientOpened(clientId));
    };
    socket.onmessage = (msg: MessageEvent) => {
      this.store.dispatch(receiveMessage(clientId, msg.data));
    }
  }

  reconnectClient(client: Client) {
    const server = client.server;
    const id = client.id;
    const url = this._getServerUrl(server);
    const socket = new WebSocket(url, server.protocolString || undefined);
    this._attachSocketListeners(socket, id);
    this.store.dispatch(reconnectClient(socket, id));
  }

  createClientAndConnect(server: IServer) {
    const state = this.store.getState();
    const id = state.nextClientNumber;
    const name = `Client ${id}`;
    const url = this._getServerUrl(server);
    const socket = new WebSocket(url, server.protocolString || undefined);
    this._attachSocketListeners(socket, id);
    const client: Client = { socket, name, server: server, id, messages: [] };
    this.store.dispatch(createClient(client));
  }

  sendMessage(message: any, client: Client) {
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
