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

console.log('wss', wss);

wss.on('server', function connection(ws) {
  console.log('on server', ws);
  ws.on('message', function incoming(message) {
    console.log('on message', message);
    ws.send(message);
  });
});
