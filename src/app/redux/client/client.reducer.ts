import { Client } from './client.model';
import { ClientActions } from './client.actions';

export const client = (state: Client, action: any): Client => {
  switch (action.type) {
    // case ClientActions.SEND_MESSAGE:
    // {
    //   const { message, clientId } = <any>action;
    //   const client = state.find(c => c.id === clientId );
    //   const messages = [...client.messages, message];
    //   const newClient = Object.assign({}, client, { messages });
    //   const newState = state.map(c => {
    //     if (c.id === clientId) {
    //       return newClient;
    //     } else {
    //       return c;
    //     }
    //   })
    //   return newState;
    // }
    // case ClientActions.RECEIVE_MESSAGE:
    // {
    //   const { message, clientId } = <any>action;
    //   const client = state.find(c => c.id === clientId );
    //   const messages = [...client.messages, message];
    //   const newClient = Object.assign({}, client, { messages });
    //   const newState = state.map(c => {
    //     if (c.id === clientId) {
    //       return newClient;
    //     } else {
    //       return c;
    //     }
    //   })
    //   return newState;
    // }
    // case ClientActions.CLIENT_OPEN:
    // {
    //   const  { time, clientId } = action;
    //   const client = state.find(c => c.id === clientId );
    //   const newClient = Object.assign({}, client, { connectedAtTime: time });
    //   const newState = state.map(c => {
    //     if (c.id === clientId) {
    //       return newClient;
    //     } else {
    //       return c;
    //     }
    //   })
    //   return newState;
    // }
    default:
      return state;
  }
}
