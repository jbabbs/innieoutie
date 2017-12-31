import { IServer } from './server.interface';
import { IMessage } from './message.interface';

export interface IProject {
  id?: number;
  name: string;
  servers: IServer[];
  messages: IMessage[];
}
