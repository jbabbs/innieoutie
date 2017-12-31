import { IServer } from '../../db/server.interface';

export interface Server extends IServer {
  proxyServerId?: number;
  proxyListenPort?: number;
}
