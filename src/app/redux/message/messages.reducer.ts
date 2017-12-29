import { IServer } from '../../db/server.interface';
import { Action } from 'redux';
import { Message } from './message.model';
import { MessageActions } from './message.actions';

export const MessagesReducer = (state: Array<Message> = [], action): Array<Message> => {
  switch (action.type) {
    case MessageActions.UPDATE_MESSAGE:
    {
      const message = action.message;
      return state.map(msg => {
        if (msg.id === message.id) {
          return Object.assign({}, msg, message);
        } else {
          return msg;
        }
      });
    }
    case MessageActions.CREATE_MESSAGE:
    {
      const { message } = <any>action;
      return [...state, message];
    }
    case MessageActions.DELETE_MESSAGE:
    {
      const { messageId } = <any>action;
      return state.filter(message => message.id !== messageId);
    }
    default:
    {
      return state;
    }
  }
};
