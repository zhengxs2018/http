import { type RequestOptions } from '../types';

export type { Agent } from 'node:http';
export type { Readable } from 'node:stream';
export type { ReadStream as FsReadStream } from 'node:fs';

export { MultipartBody } from './MultipartBody';

export type RequestInfo = globalThis.RequestInfo;
export type RequestInit = globalThis.RequestInit;
export type HeadersInit = globalThis.HeadersInit;

export interface Shims {
  kind: string;
  fetch: any;
  Request: any;
  Response: any;
  Headers: any;
  FormData: any;
  Blob: any;
  File: any;
  ReadableStream: any;
  getMultipartRequestOptions: <
    T extends NonNullable<unknown> = Record<string, unknown>,
  >(
    form: Shims['FormData'],
    opts: RequestOptions<T>,
  ) => Promise<RequestOptions<T>>;
  getDefaultAgent: (url: string) => any;
  isFsReadStream: (value: any) => boolean;
}

export let kind: Shims['kind'] | undefined = undefined;
export let fetch: Shims['fetch'] | undefined = undefined;
export let Request: Shims['Request'] | undefined = undefined;
export let Response: Shims['Response'] | undefined = undefined;
export let Headers: Shims['Headers'] | undefined = undefined;
export let FormData: Shims['FormData'] | undefined = undefined;
export let Blob: Shims['Blob'] | undefined = undefined;
export let File: Shims['File'] | undefined = undefined;
export let ReadableStream: Shims['ReadableStream'] | undefined = undefined;
export let getMultipartRequestOptions:
  | Shims['getMultipartRequestOptions']
  | undefined = undefined;
export let getDefaultAgent: Shims['getDefaultAgent'] | undefined = undefined;
export let isFsReadStream: Shims['isFsReadStream'] | undefined = undefined;

export function setShims(shims: Shims) {
  kind = shims.kind;
  fetch = shims.fetch;
  Request = shims.Request;
  Response = shims.Response;
  Headers = shims.Headers;
  FormData = shims.FormData;
  Blob = shims.Blob;
  File = shims.File;
  ReadableStream = shims.ReadableStream;
  getMultipartRequestOptions = shims.getMultipartRequestOptions;
  getDefaultAgent = shims.getDefaultAgent;
  isFsReadStream = shims.isFsReadStream;
}
