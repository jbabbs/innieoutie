import { ClientEvent } from './client-message.model';
import { Server } from '../server/server.model';

export interface Client {
  id: number;
  name: string;
  socket: WebSocket,
  server: Server,
  events: Array<ClientEvent>,
  connectedAtTime?: number; // unix timestamp
  disconnectedAtTime?: number; // unit timestamp
  proxySocketId?: number;
  error?: Error;
}
