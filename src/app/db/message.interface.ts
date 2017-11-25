export interface IMessage {
  id?: number;
  projectId: number;
  name: string;
  data: string;
  stringify: boolean;
}
