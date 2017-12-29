import { IServer } from '../../db/server.interface';
import { Client } from '../client/client.model';
import { Message } from '../message/message.model';
import { IProxy } from '../../db/proxy.interface';

export interface Project {
  id: any;
  name: string;
  servers: Array<IServer>;
  clients: Array<Client>;
  messages: Array<Message>;
  proxies: Array<IProxy>;
}
