export const ProxyMessageReceived = 'ProxyMessageReceived';
export const ProxyConnected = 'ProxyConnected';
export const ProxyListen = 'ProxyListen';
export const ProxySendMessage = 'ProxySendMessage';

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
