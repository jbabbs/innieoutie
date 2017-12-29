import { ipcMain } from 'electron';
import * as WebSocket from 'ws';
import { EchoServerPort } from '../constants';

// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong')
// })
//
// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })

const wss = new WebSocket.Server({port: EchoServerPort});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    ws.send(message);
  });
});
