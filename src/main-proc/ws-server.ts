import { ipcMain } from 'electron';
import * as WebSocket from 'ws';

// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong')
// })
//
// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })

const wss = new WebSocket.Server({ port: 8080 });

console.log('wait for connection', wss);
wss.on('connection', function connection(ws) {
  console.log('got connection', ws);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
