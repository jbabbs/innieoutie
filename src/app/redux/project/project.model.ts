import { IConnection } from '../../db/connection.interface';

export interface Project {
  id: any;
  name: string;
  connections: Array<IConnection>
};
