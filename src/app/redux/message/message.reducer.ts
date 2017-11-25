import { IConnection } from '../../db/connection.interface';
import { Action } from 'redux';
import { Message } from './message.model';
import { MessageActions } from './message.actions';

export const MessagesReducer = (state: Array<Message> = [], action: Action): Array<Message> => {
  switch (action.type) {
    case MessageActions.CREATE_MESSAGE:
    {
      const { message } = <any>action;
      return [...state, message];
    }
    default:
    {
      return state;
    }
  }
};
