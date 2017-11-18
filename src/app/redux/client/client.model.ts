import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/observable/dom/WebSocketSubject';
import { IConnection } from '../../db/connection.interface';
import { Subscription } from 'rxjs/Subscription';
import { ClientMessage } from './client-message.model';

export interface Client {
  id: number;
  name: string;
  webSocket$: WebSocketSubject<string>,
  subcription?: Subscription, // subscribing connects the socket
  config: WebSocketSubjectConfig,
  connection: IConnection,
  messages: Array<ClientMessage>,
  connectedAtTime?: number; // unix timestamp
  disconnectedAtTime?: number; // unit timestamp
}
