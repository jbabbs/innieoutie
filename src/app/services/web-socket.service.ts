import { Inject, Injectable } from '@angular/core';
import { Store } from 'redux';
import { AppState } from '../redux/app.reducer';
import { AppStore } from '../redux/app.store';
import { IServer } from '../db/server.interface';
import { Client } from '../redux/client/client.model';
import {
  createClient, receiveMessage, sendMessage, clientOpened, closeClient, removeClient, reconnectClient
} from '../redux/client/client.actions';
import { ProxyConnected, ProxyListen, ProxyMessageReceived } from '../../constants';
import { IProxy } from '../db/proxy.interface';
import { ElectronService } from './electron.service';
import { createProxyClient, sendProxyMessage } from '../redux/proxy-client/proxy-client.actions';
import { ProxyClient } from '../redux/proxy-client/proxy-client.model';

@Injectable()
export class WebSocketService {
  constructor(
    @Inject(AppStore) private store: Store<AppState> | null,
    private electron: ElectronService,
  ) {
    this._setupIpc();
  }

  _setupIpc() {
    const ipcRenderer = this.electron.ipcRenderer;

    ipcRenderer.on(ProxyMessageReceived, (event, arg) => {
      console.log('got a message', arg);
      const { message, socket } = arg;
      const state = this.store.getState();
      const client = state.currentProject.clients.find(c => {
        console.log('server socket', socket, 'item in list', c);
        if (!c.socket) {
          return;
        }
        return c.socket['id'] === socket.id;
      })
      this.sendMessage(message, client);
    });

    ipcRenderer.on(ProxyConnected, (event, args) => {
      console.log('proxy connected', args);
      const { proxy, server } = args;
      this.createProxyClientAndConnect(proxy, server);
    });
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
    const url = server.url
    const socket = new WebSocket(url, server.protocolString || undefined);
    this._attachSocketListeners(socket, id);
    this.store.dispatch(reconnectClient(socket, id));
  }

  createClientAndConnect(server: IServer) {
    const state = this.store.getState();
    const id = state.nextClientNumber;
    const name = `${server.name} ${id}`;
    const url = server.url;
    const socket = new WebSocket(url, server.protocolString || undefined);
    this._attachSocketListeners(socket, id);
    const client: Client = { socket, name, server: server, id, messages: [] };
    this.store.dispatch(createClient(client));
  }

  createProxyClientAndConnect(proxy: IProxy, server) {
    const state = this.store.getState();
    const id = state.nextClientNumber;
    const name = `${proxy.name} ${id}`;
    const url = proxy.url;
    const socket = new WebSocket(url, server.protocolString || undefined);
    this._attachSocketListeners(socket, id);
    const proxyClient: ProxyClient = { socket, name, id, messages: [], mainServer: server, proxy: proxy, server: proxy };
    this.store.dispatch(createProxyClient(proxyClient));
  }

  sendMessage(message: any, client: Client) {
    client.socket.send(message);
    this.store.dispatch(sendMessage(client.id, message));
  }

  sendProxyMessage(message: any, client: ProxyClient) {
    client.socket.send(message);
    this.store.dispatch(sendProxyMessage(client.id, message));
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

  proxyListen(proxy: IProxy) {
    this.electron.ipcRenderer.send(ProxyListen, proxy);
  }
}
