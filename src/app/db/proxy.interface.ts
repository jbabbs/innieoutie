import { IServer } from './server.interface';

export interface IProxy extends IServer {
  sourcePort: number;
}
