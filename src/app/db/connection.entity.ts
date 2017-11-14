import db from '.';
import { IConnection } from './connection.interface';

export class ConnectionEntity implements IConnection {
  id: number;
  name: string;
  url: string;
  protocolString: string;
  projectId: number;

  constructor(connection: IConnection) {
    Object.assign(this, connection);
  }

  async save(): Promise<ConnectionEntity> {
    const id = await db.connections.put(<IConnection>this);
    this.id = id;
    return this;
  }

  async delete(): Promise<void> {
    return await db.connections.delete(this.id);
  }
}
