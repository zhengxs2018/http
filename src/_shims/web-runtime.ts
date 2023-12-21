import { type RequestOptions } from '../types';
import { MultipartBody } from './MultipartBody';
import { type Shims } from './registry';

export function getRuntime(): Shims {
  return {
    kind: 'web',
    fetch: globalThis.fetch,
    Request: globalThis.Request,
    Response: globalThis.Response,
    Headers: globalThis.Headers,
    FormData: globalThis.FormData,
    Blob: globalThis.Blob,
    File: globalThis.File,
    ReadableStream: globalThis.ReadableStream,
    getMultipartRequestOptions: async <
      T extends NonNullable<unknown> = Record<string, unknown>,
    >(
      // @ts-ignore
      form: FormData,
      opts: RequestOptions<T>,
    ): Promise<RequestOptions<T>> => ({
      ...opts,
      body: new MultipartBody(form) as any,
    }),
    getDefaultAgent: () => undefined,
    isFsReadStream: () => false,
  };
}
