import { ObjectType } from '../types/ObjectType';
import { QueryParamsObject } from '../types/QueryParamsObject';

export interface ApiBaseRequestParams<RequestData extends ObjectType> {
  url: string;
  urlParams?: QueryParamsObject;
  noerror?: boolean;
  body?: RequestData;
  signal?: AbortSignal;
}

export type AvailableHTTPMethods = 'POST' | 'GET' | 'PUT' | 'DELETE';

export type ApiGetRequestParams<RequestData extends ObjectType> =
  ApiBaseRequestParams<RequestData>;

export type ApiCreateRequestParams<RequestData extends ObjectType> =
  ApiBaseRequestParams<RequestData>;

export type ApiUploadRequestParams<RequestData extends ObjectType> =
  ApiBaseRequestParams<RequestData>;

export type ApiDeleteRequestParams<RequestData extends ObjectType> =
  ApiBaseRequestParams<RequestData>;

export interface FetchParams {
  api: string;
  method: AvailableHTTPMethods;
  body?: ObjectType;
  mockKey?: string;
}

export interface ApiResponseError {
  code: number;
  message: string;
}

export interface ApiBaseEventEmitParams {
  timestamp?: number;
  api?: string;
  method?: AvailableHTTPMethods;
}

export interface CompletedWithErrorEmitParams extends ApiBaseEventEmitParams {
  code: number;
  message: string;
}

export interface ApiEventsEmitters {
  request_started: ApiBaseEventEmitParams;
  request_finished: ApiBaseEventEmitParams;
  completed_with_success: ApiBaseEventEmitParams;
  completed_with_error: CompletedWithErrorEmitParams;
}

export type ApiEvents = keyof ApiEventsEmitters;


