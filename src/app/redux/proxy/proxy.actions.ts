import { Action, ActionCreator } from 'redux';
import { IProxy } from '../../db/proxy.interface';

export enum ProxyActions {
  CREATE_PROXY = 'CREATE_PROXY',
  REMOVE_PROXY = 'REMOVE_PROXY',
  UPDATE_PROXY = 'UPDATE_PROXY',
}

export interface AddProxyAction extends Action {
  proxy: IProxy;
}

export const createProxy: ActionCreator<AddProxyAction> = (proxy: IProxy) => {
  return {
    type: ProxyActions.CREATE_PROXY,
    proxy,
  }
};

export interface RemoveProxyAction extends Action {
  id: number;
}

export const removeProxy: ActionCreator<RemoveProxyAction> = (id: number) => ({
  type: ProxyActions.REMOVE_PROXY,
  id
});

export const updateProxy = (proxy: IProxy) => ({
  type: ProxyActions.UPDATE_PROXY,
  proxy,
})
