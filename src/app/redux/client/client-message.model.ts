export enum ClientMessageDirection {
  SENT,
  RECEIVED,
}

export interface ClientMessage {
  direction: ClientMessageDirection;
  data: string | Blob | File;
  len: number;
  time: number;
}
