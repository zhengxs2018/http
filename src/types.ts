import {
  type Agent,
  type Readable,
  type RequestInfo,
  type RequestInit,
} from './_shims/index';

export type PromiseOrValue<T> = T | Promise<T>;
export type KeysEnum<T> = { [P in keyof Required<T>]: true };

export type Fetch = (url: RequestInfo, init?: RequestInit) => Promise<Response>;
export type RequestClient = { fetch: Fetch };
export type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type ReqHeaders = Record<string, string | null | undefined>;
export type DefaultQuery = Record<string, string | undefined>;

export type RequestOptions<
  Req extends NonNullable<unknown> = Record<string, unknown> | Readable,
> = {
  method?: HTTPMethod;
  path?: string;
  query?: Req | undefined;
  body?: Req | undefined;
  headers?: ReqHeaders | undefined;

  maxRetries?: number;
  stream?: boolean | undefined;
  timeout?: number;
  httpAgent?: Agent;
  signal?: AbortSignal | undefined | null;
  idempotencyKey?: string;

  __binaryResponse?: boolean | undefined;
};

export type FinalRequestOptions<
  Req extends NonNullable<unknown> = Record<string, unknown> | Readable,
> = RequestOptions<Req> & {
  method: HTTPMethod;
  path: string;
};

export type APIResponseProps = {
  response: Response;
  options: FinalRequestOptions;
  controller: AbortController;
};
