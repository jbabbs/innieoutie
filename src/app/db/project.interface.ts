import { IConnection } from './connection.interface';

export interface IProject {
  id?: number;
  name: string;
  connections?: IConnection[];
}
