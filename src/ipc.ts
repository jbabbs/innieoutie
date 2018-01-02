export const ProxyMessageReceived = 'ProxyMessageReceived';
export const ProxyConnected = 'ProxyConnected';
export const ProxyListen = 'ProxyListen';
export const ProxySendMessage = 'ProxySendMessage';
export const ProxyCloseSocket = 'ProxyCloseSocket';
export const ProxyBindFailed = 'ProxyBindFailed';
export const ProxySocketError = 'ProxySocketError';

export interface ProxyMessageReceivedArgs {
  data: string | Blob;
  socketId: number;
}

export interface ProxyListenReturn {
  port: number;
  serverId: number;
}

export interface ProxyConnectedArgs {
  socketId: number;
  serverId: number;
}

export interface ProxySendMessageArgs {
  data: string | Blob;
  socketId: number;
}

export interface ProxyBindFailedArgs {
  serverId: number;
  error: Error;
}

export interface ProxySocketErrorArgs {
  socketId: number;
  error: Error;
}

export interface ProxyCloseSocketArgs {
  socketId: number;
}
