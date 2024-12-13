import Bus from "../../bus";
import { ApiBaseRequestParams } from "../api/api.types";
import { ObjectType } from "../types/ObjectType";

export type SocketCreateConnectionRequestParams<RequestData extends ObjectType> = ApiBaseRequestParams<RequestData>

export interface SocketError {
  code: number;
  message: string;
}

export type Message<T> = keyof T extends infer Keys
  ? (Keys extends keyof T
    ? {
      type: Keys;
    } & (
      T[Keys] extends undefined
        ? { data?: undefined }
        : { data: T[Keys] }
    )
    : never)
  : never

export interface BusReceiver<T extends object> {
  connect: undefined;
  disconnect: {
    error: boolean;
  };
  error: SocketError;
  message: Message<T>;
}

export interface Connection<T extends object> {
  SocketInstance: WebSocket;
  BusReceiverInstance: Bus<BusReceiver<T>>;
  connected: boolean;
  destroyed: boolean;
  api: string;
}

export interface CreateConnectionProxy<Response extends object, Request extends object> {
  api: string;
  on: Bus<BusReceiver<Response>>['on'];
  off: Bus<BusReceiver<Response>>['off'];
  emit: (message: Message<Request>) => Promise<boolean>;
  disconnect: () => Promise<void>;
}

// Internal emits:

export interface SocketBaseEventEmitParams {
  api?: string;
  timestamp?: number;
}

export interface ReceivedErrorEmitParams extends SocketBaseEventEmitParams {
  code: number;
  message: string;
}

export interface AttemptToReconnectEmitParams extends SocketBaseEventEmitParams {
  latency: number;
}

export interface SocketEventsEmitters {
  connecting: SocketBaseEventEmitParams;
  connect_failed: SocketBaseEventEmitParams;
  connect_successed: SocketBaseEventEmitParams;
  connection_lost: SocketBaseEventEmitParams;
  disconnected: SocketBaseEventEmitParams;
  attempt_to_reconnect: AttemptToReconnectEmitParams;
  reconnecting: SocketBaseEventEmitParams;
  reconnect_failed: SocketBaseEventEmitParams;
  reconnect_successed: SocketBaseEventEmitParams;
  received_message: SocketBaseEventEmitParams;
  received_error: ReceivedErrorEmitParams;
  emited_message: SocketBaseEventEmitParams;
}

export type SocketEvents = keyof SocketEventsEmitters

export interface BaseSocketReceiveMessages {
  pong: undefined;
  error: SocketError;
}

export interface BaseSocketEmitMessages {
  ping: undefined;
}
