export enum ClientMessageDirection {
  SENT,
  RECEIVED,
}

export interface ClientMessage {
  direction: ClientMessageDirection;
  data: string;
  len: number;
  time: number;
}
