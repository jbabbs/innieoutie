import { ipcMain } from 'electron';
import * as WebSocket from 'ws';
import {
  ProxyConnected, ProxyListen, ProxyListenReturn, ProxyMessageReceived, ProxyMessageReceivedArgs, ProxySendMessage,
  ProxySendMessageArgs
} from '../ipc';
import { ProxyServerPort } from '../constants';
import { isString } from 'util';

// generate unique ids so we can communicate between the main thread and render
const servers: Map<number, WebSocket.Server> = new Map();
const sockets: Map<number, WebSocket> = new Map();

let nextServerId = 1;
let nextSocketId = 1;

ipcMain.on(ProxyListen, (event): void => {
  const port = ProxyServerPort + nextSocketId - 1;
  console.log('proxy-listen', port);
  const server = new WebSocket.Server({ port });
  const serverId = nextServerId++;
  servers.set(serverId, server);

  server.on('connection', (socket: WebSocket) => {
    console.log('proxy-connected');
    const socketId = nextSocketId++;
    sockets.set(socketId, socket);
    event.sender.send(ProxyConnected, { serverId, socketId });

    socket.on('message', (data: WebSocket.Data) => {
      console.log('message received', data);
      let convertedData: string | Blob;

      // WebSocket.Data = string | Buffer | ArrayBuffer | Buffer[];
      if (isString(data)) {
        convertedData = <string>data;
        //} else if (data instanceof ArrayBuffer) {
      } else {
        // converted to a blob
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
  console.log('send-message-to-client', args);
  const { socketId, data } = args;
  const socket = sockets.get(socketId);

  socket.send(data);
});


