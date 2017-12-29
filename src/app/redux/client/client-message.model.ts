import { isString } from 'util';

export enum MessageType {
  Unknown = 'Unknown',
  String = 'String',
  JSON = 'JSON',
  Blob = 'Blob',
  File = 'File',
}

export enum ClientMessageDirection {
  SENT,
  RECEIVED,
}

export class ClientMessage {
  direction: ClientMessageDirection;
  data: string | Blob | File;
  len: number;
  time: number;
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
