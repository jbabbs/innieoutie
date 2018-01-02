import { ClientMessage } from './client-message.model';
import { Server } from '../server/server.model';

export interface Client {
  id: number;
  name: string;
  socket: WebSocket,
  server: Server,
  messages: Array<ClientMessage>,
  connectedAtTime?: number; // unix timestamp
  disconnectedAtTime?: number; // unit timestamp
  proxySocketId?: number;
  error?: Error;
}
