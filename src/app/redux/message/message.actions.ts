export enum MessageActions {
  CREATE_MESSAGE = 'CREATE_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
  UPDATE_MESSAGE = 'UPDATE_MESSAGE',
}

export const createMessage = message => ({
  type: MessageActions.CREATE_MESSAGE,
  message,
});

export const deleteMessage = messageId => ({
  type: MessageActions.DELETE_MESSAGE,
  messageId,
});

export const updateMessage = message => ({
  type: MessageActions.UPDATE_MESSAGE,
  message,
})
