export enum ClientMessageDirection {
  SENT,
  RECEIVED,
}

export interface ClientMessage {
  direction: ClientMessageDirection;
  data: string;
  size: number;
  time: number;
}
