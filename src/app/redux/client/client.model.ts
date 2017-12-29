import { IServer } from '../../db/server.interface';
import { ClientMessage } from './client-message.model';

export interface Client {
  id: number;
  name: string;
  socket: WebSocket,
  server: IServer,
  messages: Array<ClientMessage>,
  connectedAtTime?: number; // unix timestamp
  disconnectedAtTime?: number; // unit timestamp
}
