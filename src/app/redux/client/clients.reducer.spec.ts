import { deepFreeze } from 'test-utils/deep-freeze';
import { ClientsReducer } from './clients.reducer';
import { sendMessage } from './client.actions';

describe('Client Reducer', () => {
  it ('should add a message to a client', () => {
    const initial = [{name: '1', id: 0, messages: [] }, {name: '2', id: 1, messages: []}];
    deepFreeze(initial);
    const action = sendMessage(0, '123');
    const actual: any = ClientsReducer(<any>initial, action);
    expect(actual[0].messages.length).toBe(1);
    expect(actual[1].messages.length).toBe(0);
  });
});
