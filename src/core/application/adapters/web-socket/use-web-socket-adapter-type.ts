import type { Socket } from "socket.io-client"

export interface WebSocketResponseDto<T> {
  reqId: string
  data: T
  success: boolean
}

export interface WebsocketListeningEventsParams<T> {
  socket: Socket,
  eventCallback: (payload: WebSocketResponseDto<T>) => void
}
export interface WebsocketSubscribeParams {
  socket: Socket
  channelName: string,
}
export interface WebsocketConnectParams<T> {
  socket: Socket
  channelName: string,
  subscribe: (params: WebsocketSubscribeParams) => void,
  eventCallback: WebsocketListeningEventsParams<T>["eventCallback"]
}
export interface WebsocketConnectAndListenParams<T> {
  channelName: string
  eventCallback: WebsocketListeningEventsParams<T>["eventCallback"]
}
export interface UseWebSocketAdapterReturn {
  // connect(callback: VoidFunction): void
  // joinChannel(callback: VoidFunction): void
  // connectAndListen<T>(params: WebsocketConnectAndListenParams<T>): void
  connectAndListen<T>(params: WebsocketConnectAndListenParams<T>): Socket
  disconect(socket: Socket): void
  // socket: Socket
}
