import { EchoServerPort } from '../constants';
import * as WebSocket from 'ws';

const server = new WebSocket.Server({port: EchoServerPort});

server.on('connection', function connection(ws) {
  setInterval(() => {
    ws.close();
  }, 1000)
  ws.on('message', function incoming(message) {
    ws.send(message);
  });
});
