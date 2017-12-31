import { Client } from '../client/client.model';
import { Message } from '../message/message.model';
import { Server } from '../server/server.model';

export interface Project {
  id: any;
  name: string;
  servers: Array<Server>;
  clients: Array<Client>;
  messages: Array<Message>;
}
