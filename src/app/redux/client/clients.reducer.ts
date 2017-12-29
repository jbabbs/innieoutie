import { Client } from './client.model';
import { ClientActions, CreateClientAction } from './client.actions';
import { client as clientReducer } from './client.reducer';

export const ClientsReducer = (state: Array<Client> = [], action: any): Array<Client> => {
  switch (action.type) {
    case ClientActions.CREATE_CLIENT:
    {
      const client = (<CreateClientAction>action).client;
      return [...state, client];
    }
    case ClientActions.REMOVE_CLIENT:
    {
      const clientId = action.clientId;
      return state.filter(c => c.id !== clientId);
    }
    default:
    {
      const { clientId } = <any>action;

      if (!clientId) {
        throw new Error('clientId missing for this action');
      }

      return state.map(c => {
        if (c.id === clientId) {
          return clientReducer(c, action)
        } else {
          return c;
        }
      })
    }

  }
};
