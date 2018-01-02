import { ipcMain } from 'electron';
import * as WebSocket from 'ws';
import {
  ProxyConnected, ProxyListen, ProxyListenReturn, ProxyMessageReceived, ProxyMessageReceivedArgs, ProxySendMessage,
  ProxySendMessageArgs, ProxyBindFailed, ProxyBindFailedArgs, ProxySocketErrorArgs, ProxySocketError
} from '../ipc';
import { ProxyServerPort } from '../constants';
import { isString } from 'util';

// generate unique ids for servers and sockets so we can communicate between the main thread and render
const servers: Map<number, WebSocket.Server> = new Map();
const sockets: Map<number, WebSocket> = new Map();

let nextServerId = 1;
let nextSocketId = 1;

ipcMain.on(ProxyListen, (event): void => {
  const port = ProxyServerPort + nextServerId - 1;
  const server = new WebSocket.Server({ port });
  const serverId = nextServerId;
  servers.set(serverId, server);

  server.on('listening', () => {
    // Binding to port was successful, allow allocation of next port
    nextServerId++;
  });

  server.on('error', error => {
    // Bind failed
    const args: ProxyBindFailedArgs = { error, serverId };
    event.sender.send(ProxyBindFailed, args);
  });

  server.on('connection', (socket: WebSocket) => {
    const socketId = nextSocketId++;
    sockets.set(socketId, socket);
    event.sender.send(ProxyConnected, { serverId, socketId });

    socket.on('error', error => {
      const args: ProxySocketErrorArgs = { socketId, error };
      event.sender.send(ProxySocketError, args);
    });

    socket.on('message', (data: WebSocket.Data) => {
      let convertedData: string | Blob;

      // WebSocket.Data types = string | Buffer | ArrayBuffer | Buffer[];
      if (isString(data)) {
        convertedData = <string>data;
      } else {
        // convert to a blob
        convertedData = new Blob([data]);
      }
      const m: ProxyMessageReceivedArgs = { socketId, data: convertedData }
      event.sender.send(ProxyMessageReceived, m);
    });
  });

  const ret: ProxyListenReturn = { port, serverId };
  event.returnValue = ret;
});

ipcMain.on(ProxySendMessage,  (event, args: ProxySendMessageArgs) => {
  const { socketId, data } = args;
  const socket = sockets.get(socketId);

  socket.send(data);
});


