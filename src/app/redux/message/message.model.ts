export interface Message {
  id: number,
  name: string,
  data: string | File,
  type: string, // string or file
}
