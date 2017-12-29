import { Client } from '../client/client.model';

export interface ProxyClient extends Client {
  socketOutgoing: WebSocket;
  // id: number;
  // name: string;
  // socket: WebSocket,
  // server: IServer,
  // messages: Array<ClientMessage>,
  // connectedAtTime?: number; // unix timestamp
  // disconnectedAtTime?: number; // unit timestamp
}
