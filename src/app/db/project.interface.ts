import { IConnection } from './connection.interface';
import { IMessage } from './message.interface';

export interface IProject {
  id?: number;
  name: string;
  connections?: IConnection[];
  messages?: IMessage[];
}
