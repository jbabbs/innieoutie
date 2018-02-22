import { isString } from 'util';

export enum MessageType {
  Unknown = 'Unknown',
  String = 'String',
  JSON = 'JSON',
  Blob = 'Blob',
  File = 'File',
}

export enum ClientMessageDirection {
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
}

// A message or error which shows up in the client log
export abstract class ClientEvent {
  time: number;

  constructor() {
    this.time = +new Date();
  }

  abstract type();
}

export class ClientMessage extends ClientEvent {
  direction: ClientMessageDirection;
  data: string | Blob | File;
  len: number;

  constructor() {
    super();
  }

  type() { return 'message'; };
}

export class ClientError extends ClientEvent {
  message: string;

  constructor() {
    super();
  }

  type() { return 'error'; }
}

export function messageType(data: any): MessageType {
  if (data instanceof File) {
    return MessageType.File;
  }
  // Order matters, because a File is a blob. Check for File first
  if (data instanceof Blob) {
    return MessageType.Blob;
  }
  if (isString(data)) {
    try {
      JSON.parse(data);
      return MessageType.JSON;
    } catch (e) {
      return MessageType.String;
    }
  }
  return MessageType.Unknown;
}
