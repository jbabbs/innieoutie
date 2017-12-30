import { IServer } from './server.interface';
import { IMessage } from './message.interface';
import { IProxy } from './proxy.interface';

export interface IProject {
  id?: number;
  name: string;
  servers: IServer[];
  messages: IMessage[];
  proxies: IProxy[];
}
