import { ipcMain } from 'electron';
import * as WebSocket from 'ws';
import { EchoServerPort, ProxyConnected, ProxyListen, ProxyMessageReceived, ProxySendMessage } from '../constants';
import { IProxy } from '../app/db/proxy.interface';

function setupLocalEchoServer() {
  const server = new WebSocket.Server({port: EchoServerPort});

  server.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      ws.send(message);
    });
  });
}

let socketId = 0;

ipcMain.on(ProxyListen, (event, proxy: IProxy) => {
  console.log('proxy-listen', proxy);
  const { listenPort } = proxy;
  const server = new WebSocket.Server({port: listenPort});
  server.on('connection', (socket: WebSocket) => {
    console.log('proxy-connected');
    socket['id'] = socketId++;
    event.sender.send(ProxyConnected, { server, socket, proxy });
    socket.on('message', message => {
      console.log('message received', message);
      event.sender.send(ProxyMessageReceived, { message, server, socket, proxy });
    });
  });
})

ipcMain.on(ProxySendMessage,  (event, args) => {
  console.log('send-message-to-client', args);
  const { socket, message } = args;
  socket.send(message);
});

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })

setupLocalEchoServer();

