import { deepFreeze } from 'test-utils/deep-freeze';
import { ClientsReducer } from './clients.reducer';
import { sendMessage, setClientName } from './client.actions';

fdescribe('Client Reducer', () => {
  it('should rename a client', () => {
    const initial = [{name: '1', id: 0 }, {name: '2', id: 1}];
    deepFreeze(initial);
    const action = setClientName(0, '3');
    const actual: any = ClientsReducer(<any>initial, action);
    const expected = [{name: '3', id: 0}, {name: '2', id: 1}];
    expect(expected).toEqual(actual);
  });

  it ('should add a message to a client', () => {
    const initial = [{name: '1', id: 0, messages: [] }, {name: '2', id: 1, messages: []}];
    deepFreeze(initial);
    const action = sendMessage(0, '123');
    const actual: any = ClientsReducer(<any>initial, action);
    expect(actual[0].messages.length).toBe(1);
    expect(actual[1].messages.length).toBe(0);
  });
});
