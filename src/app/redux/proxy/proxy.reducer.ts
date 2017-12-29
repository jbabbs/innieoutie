import { IServer } from '../../db/server.interface';
import { Action } from 'redux';
import { AddProxyAction, ProxyActions, RemoveProxyAction } from './proxy.actions';

export const ProxyReducer = (state: Array<IServer> = [], action: Action): Array<IServer> => {
  switch (action.type) {
    case ProxyActions.CREATE_PROXY:
    {
      const proxy = (<AddProxyAction>action).proxy;
      return [...state, proxy];
    }
    case ProxyActions.REMOVE_PROXY:
    {
      const id = (<RemoveProxyAction>action).id;
      return state.filter(con => con.id !== id);
    }
    case ProxyActions.UPDATE_PROXY:
    {
      const proxy = (<AddProxyAction>action).proxy;
      return state.map(p => {
        if (p.id === proxy.id) {
          return Object.assign({}, p, proxy);
        } else {
          return p;
        }
      });
    }
    default:
    {
      return state;
    }
  }
};
