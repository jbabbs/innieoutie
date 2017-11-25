export enum MessageActions {
  CREATE_MESSAGE = 'CREATE_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
}

export const createMessage = message => ({
  type: MessageActions.CREATE_MESSAGE,
  message,
})
