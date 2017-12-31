import { Inject, Injectable } from '@angular/core';
import { Store } from 'redux';
import { AppState } from '../redux/app.reducer';
import { AppStore } from '../redux/app.store';
import { Client } from '../redux/client/client.model';
import {
  createClient, receiveMessage, sendMessage, clientOpened, closeClient, removeClient, reconnectClient
} from '../redux/client/client.actions';

import { ElectronService } from './electron.service';
import { Server } from '../redux/server/server.model';
import {
  ProxyConnected, ProxyConnectedArgs, ProxyListen, ProxyListenReturn, ProxyMessageReceived,
  ProxyMessageReceivedArgs, ProxySendMessage, ProxySendMessageArgs
} from '../../ipc';
import { updateServer } from '../redux/server/server.actions';

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

    ipcRenderer.on(ProxyMessageReceived, (event, args: ProxyMessageReceivedArgs) => {
      console.log('got a message', args);
      const state = this.store.getState();
      const { data, socketId } = args;
      const client = state.currentProject.clients.find(c => {
        return c.proxySocketId === socketId;
      })
      if (!client) {
        throw new Error('Message received from proxy, but associated client not found');
      }
      this.sendMessage(data, client);
    });

    ipcRenderer.on(ProxyConnected, (event, args: ProxyConnectedArgs) => {
      console.log('proxy connected', args);
      const state = this.store.getState();
      const { socketId, serverId } = args;
      const server = state.currentProject.servers.find(s => {
        return s.proxyServerId === serverId;
      });
      if (!server) {
        throw new Error('Proxy server connected, but associated server was not found');
      }
      this.createClientAndConnect(server, socketId);
    });
  }

  _attachSocketListeners(socket, clientId) {
    socket.onopen = () => {
      this.store.dispatch(clientOpened(clientId));
    };
    socket.onmessage = (msg: MessageEvent) => {
      this.store.dispatch(receiveMessage(clientId, msg.data));

      const state = this.store.getState();
      const client: Client = state.currentProject.clients.find(c => c.id === clientId);

      if (!client) {
        throw new Error('Client not found');
      }

      if (client.proxySocketId) {
        // echo the message back
        const m: ProxySendMessageArgs = {
          data: msg.data,
          socketId: client.proxySocketId,
        }
        this.electron.ipcRenderer.send(ProxySendMessage, m);
      }
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

  createClientAndConnect(server: Server, proxySocketId?: number) {
    const state = this.store.getState();
    const id = state.nextClientNumber;
    const name = `${server.name} ${id}`;
    const url = server.url;
    const socket = new WebSocket(url, server.protocolString || undefined);
    this._attachSocketListeners(socket, id);
    const client: Client = { socket, name, server: server, id, messages: [] };
    if (proxySocketId) {
      client.proxySocketId = proxySocketId;
    }
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

  proxyListen(server: Server) {
    const res: ProxyListenReturn = this.electron.ipcRenderer.sendSync(ProxyListen);
    const { port, serverId } = res;
    server.proxyListenPort = port;
    server.proxyServerId = serverId;
    this.store.dispatch(updateServer(server));
  }
}
