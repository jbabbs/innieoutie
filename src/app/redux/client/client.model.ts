import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/observable/dom/WebSocketSubject';
import { IConnection } from '../../db/connection.interface';
import { Subscription } from 'rxjs/Subscription';

// constants are defined here -> https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
export enum WebSocketReadyState {
  CONNECTING =  0,
  OPEN =  1,
  CLOSING =  2,
  CLOSED =  3,
}

export interface Client {
  id: number;
  name: string;
  webSocket$: WebSocketSubject<string>,
  subcription?: Subscription, // subscribing connects the socket
  config: WebSocketSubjectConfig,
  readyState: WebSocketReadyState,
  connection: IConnection,
}
