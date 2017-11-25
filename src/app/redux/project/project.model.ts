import { IConnection } from '../../db/connection.interface';
import { Client } from '../client/client.model';
import { Message } from '../message/message.model';

export interface Project {
  id: any;
  name: string;
  connections: Array<IConnection>;
  clients: Array<Client>;
  messages: Array<Message>;
}
