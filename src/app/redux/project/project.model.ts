import { IConnection } from '../../db/connection.interface';
import { Client } from '../client/client.model';

export interface Project {
  id: any;
  name: string;
  connections: Array<IConnection>;
  clients: Array<Client>;
  nextClientNumber: number;
  activeClientTabIdx: number;
}
