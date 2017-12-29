import { proxyClient as proxyClientReducer } from './proxy-client.reducer';
import { ProxyClient } from './proxy-client.model';
import { ProxyClientActions } from './proxy-client.actions';

export const proxyClientsReducer = (state: Array<ProxyClient> = [], action: any): Array<ProxyClient> => {
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
        throw new Error('clientId missing for this action');
      }

      return state.map(c => {
        if (c.id === clientId) {
          return proxyClientReducer(c, action);
        } else {
          return c;
        }
      })
    }

  }
};
