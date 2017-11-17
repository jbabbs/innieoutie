import { Action, ActionCreator } from 'redux';
import { IConnection } from '../../db/connection.interface';

export enum ConnectionActions {
  CREATE_CONNECTION = 'CREATE_CONNECTION',
  REMOVE_CONNECTION = 'REMOVE_CONNECTION',
}

export interface AddConnectionAction extends Action {
  connection: IConnection;
}

export interface RemoveConnectionAction extends Action {
  id: number;
}

export const createConnection: ActionCreator<AddConnectionAction> = (connection: IConnection) => ({
  type: ConnectionActions.CREATE_CONNECTION,
  connection
});

export const removeConnection: ActionCreator<RemoveConnectionAction> = (id: number) => ({
  type: ConnectionActions.REMOVE_CONNECTION,
  id
});
