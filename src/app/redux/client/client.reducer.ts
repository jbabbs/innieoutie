import { Client } from './client.model';
import { ClientActions } from './client.actions';

export const client = (state: Client, action: any): Client => {
  switch (action.type) {
    case ClientActions.RECONNECT_CLIENT:
    {
      const { socket } = <any>action;
      return Object.assign({}, state, { socket });
    }
    case ClientActions.CLIENT_CLOSED:
    {
      return state;
    }
    case ClientActions.SEND_MESSAGE:
    {
      const { message } = <any>action;
      const events = [...state.events, message];
      return Object.assign({}, state, { events });
    }
    case ClientActions.LOG_ERROR:
    {
      const { error } = <any>action;
      const events = [...state.events, error];
      return Object.assign({}, state, { events });
    }
    case ClientActions.RECEIVE_MESSAGE:
    {
      const { message } = <any>action;
      const events = [...state.events, message];
      return Object.assign({}, state, { events });
    }
    case ClientActions.CLIENT_OPEN:
    {
      const  { time } = action;
      return Object.assign({}, state, { connectedAtTime: time });
    }
    case ClientActions.UPDATE_CLIENT:
    {
      const { newClient } = <any>action;
      return Object.assign({}, state, newClient);
    }
    default:
      return state;
  }
}
