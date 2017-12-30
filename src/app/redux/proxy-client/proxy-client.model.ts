import { Client } from '../client/client.model';
import * as WebSocket from 'ws';
import { IProxy } from '../../db/proxy.interface';

// export enum ProxyStatus {
//   Idle = 'Idle',
//   Listening = 'Listening',
//   Connected = 'Connected',
//   Error = 'Error',
// }

export interface ProxyClient extends Client {
  proxy: IProxy;
  mainServer: WebSocket; // should only be used on main process
  mainSocket?; // should only be used on main process
}
