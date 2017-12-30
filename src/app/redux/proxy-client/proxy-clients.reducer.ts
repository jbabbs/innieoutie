import { ProxyClient } from './proxy-client.model';
import { ProxyClientActions } from './proxy-client.actions';
import { ProxyClientReducer } from './proxy-client.reducer';

export const ProxyClientsReducer = (state: Array<ProxyClient> = [], action: any): Array<ProxyClient> => {
  switch (action.type) {
    case ProxyClientActions.CREATE_PROXY_CLIENT:
    {
      const client = action.client;
      return [...state, client];
    }
    case ProxyClientActions.REMOVE_PROXY_CLIENT:
    {
      const clientId = action.clientId;
      return state.filter(c => c.id !== clientId);
    }
    default:
    {
      const { clientId } = <any>action;

      if (!clientId) {
        return state;
      }

      return state.map(c => {
        if (c.id === clientId) {
          return ProxyClientReducer(c, action);
        } else {
          return c;
        }
      })
    }
  }
};
