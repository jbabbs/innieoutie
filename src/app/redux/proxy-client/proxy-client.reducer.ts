import { ProxyClient } from './proxy-client.model';
import { ProxyClientActions } from './proxy-client.actions';

export const proxyClient = (state: ProxyClient, action: any): ProxyClient => {
  switch (action.type) {
    case ProxyClientActions.RECONNECT_PROXY_CLIENT:
    {
      const { socket } = <any>action;
      return Object.assign({}, state, { socket });
    }
    case ProxyClientActions.PROXY_CLIENT_CLOSED:
    {
      return state;
    }
    case ProxyClientActions.SEND_PROXY_MESSAGE:
    {
      const { message } = <any>action;
      const messages = [...state.messages, message];
      return Object.assign({}, state, { messages });
    }
    case ProxyClientActions.RECEIVE_PROXY_MESSAGE:
    {
      const { message } = <any>action;
      const messages = [...state.messages, message];
      return Object.assign({}, state, { messages });
    }
    case ProxyClientActions.PROXY_CLIENT_OPEN:
    {
      return state;
    }
    default:
      return state;
  }
}
