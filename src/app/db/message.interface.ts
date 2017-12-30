export interface IMessage {
  id?: number;
  projectId: number;
  name: string;
  data: string | File | Blob;
  type: 'file' | 'string';
}
