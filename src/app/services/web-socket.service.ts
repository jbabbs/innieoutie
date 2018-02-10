import { Inject, Injectable } from '@angular/core';
import { Store } from 'redux';
import { AppState } from '../redux/app.reducer';
import { AppStore } from '../redux/app.store';
import { Client } from '../redux/client/client.model';
import {
  createClient, receiveMessage, sendMessage, clientOpened, removeClient, reconnectClient, updateClient,
  logError
} from '../redux/client/client.actions';

import { ElectronService } from './electron.service';
import { Server } from '../redux/server/server.model';
import {
  ProxyBindFailed, ProxyBindFailedArgs, ProxyCloseSocket, ProxyCloseSocketArgs,
  ProxyConnected, ProxyConnectedArgs, ProxyListen, ProxyListenReturn, ProxyMessageReceived,
  ProxyMessageReceivedArgs, ProxySendMessage, ProxySendMessageArgs, ProxySocketError, ProxySocketErrorArgs
} from '../../ipc';
import { updateServer } from '../redux/server/server.actions';
import { ErrorModalService } from './error-modal.service';

@Injectable()
export class WebSocketService {
  constructor(
    @Inject(AppStore) private store: Store<AppState> | null,
    private electron: ElectronService,
    private errorModalService: ErrorModalService,
  ) {
    this._setupIpc();
  }

  _setupIpc() {
    const ipcRenderer = this.electron.ipcRenderer;

    ipcRenderer.on(ProxyMessageReceived, (event, args: ProxyMessageReceivedArgs) => {
      const state = this.store.getState();
      const { data, socketId } = args;
      const client = state.currentProject.clients.find(c => {
        return c.proxySocketId === socketId;
      });
      if (!client) {
        throw new Error('Message received from proxy, but associated client not found');
      }
      this.sendMessage(data, client);
    });

    ipcRenderer.on(ProxyBindFailed, (event, args: ProxyBindFailedArgs) => {
      const { error, serverId } = args;
      this.errorModalService.showErrorModal(error, 'Proxy WebSocket.Server error.');
      const state = this.store.getState();
      const server = state.currentProject.servers.find(s => s.proxyServerId === serverId);
      if (!server) {
        throw new Error('Server bind failed, but unable to find server object');
      }
      delete server.proxyServerId;
      delete server.proxyListenPort;
      this.store.dispatch(updateServer(server));
    });

    ipcRenderer.on(ProxyConnected, (event, args: ProxyConnectedArgs) => {
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

    ipcRenderer.on(ProxySocketError, (event, args: ProxySocketErrorArgs) => {
      const { error, socketId } = args;
      // We don't need to show the error message. Instead, set client tab to red.
      // this.errorModalService.showErrorModal(error, 'Proxy WebSocket error.');
      const state = this.store.getState();
      const client = state.currentProject.clients.find(s => s.id === socketId);
      if (!client) {
        throw new Error('Proxy error, but associated client not found.');
      }
      client.error = error;
      if (client.socket) {
        client.socket.close();
        delete client.socket;
      }
      this.store.dispatch(updateClient(client));
    });
  }

  _closeProxySocket(clientId, error?: Error) {
    const state = this.store.getState();
    const client: Client = state.currentProject.clients.find(c => c.id === clientId);

    if (!client) {
      throw new Error('Client not found');
    }

    client.disconnectedAtTime = +new Date();

    if (error) {
      client.error = error;
    }

    if (client.proxySocketId) {
      // Close the proxy socket
      delete client.proxySocketId;

      if (client.proxySocketId) {
        const args: ProxyCloseSocketArgs = { socketId: client.proxySocketId };
        this.electron.ipcRenderer.send(ProxyCloseSocket, args);
      }
    }

    this.store.dispatch(updateClient(client));
  }

  _attachSocketListeners(socket, clientId) {
    socket.onopen = () => {
      this.store.dispatch(clientOpened(clientId));
    };
    socket.onmessage = (msg: MessageEvent) => {
      const state = this.store.getState();
      const client: Client = state.currentProject.clients.find(c => c.id === clientId);

      if (!client) {
        throw new Error('Client not found');
      }

      if (client.proxySocketId) {
        // echo the message back to the proxy
        const m: ProxySendMessageArgs = {
          data: msg.data,
          socketId: client.proxySocketId,
        };
        this.electron.ipcRenderer.send(ProxySendMessage, m);
      }
      this.store.dispatch(receiveMessage(clientId, msg.data));
    };
    socket.onclose = () => {
      this._closeProxySocket(clientId);
    };
    socket.onerror = err => {
      this._closeProxySocket(clientId, err);
    }
  }

  reconnectClient(client: Client) {
    const server = client.server;
    const id = client.id;
    const url = server.url;
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
    const client: Client = { socket, name, server: server, id, events: [] };
    if (proxySocketId) {
      client.proxySocketId = proxySocketId;
    }
    this.store.dispatch(createClient(client));
  }

  sendMessage(message: any, client: Client) {
    try {
      client.socket.send(message);
    } catch (e) {
      this.store.dispatch(logError(client.id, e.message));
      return;
    }
    this.store.dispatch(sendMessage(client.id, message));
  }

  disconnectClient(client: Client) {
    if (client.socket) {
      client.socket.close();
    }
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
