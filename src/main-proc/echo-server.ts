import { EchoServerPort } from '../constants';
import * as WebSocket from 'ws';

const server = new WebSocket.Server({port: EchoServerPort});

server.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    ws.send(message);
  });
});
