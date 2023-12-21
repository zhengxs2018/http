import { ReadStream as FsReadStream } from 'node:fs';
import { type Agent } from 'node:http';
import { Readable } from 'node:stream';
import { ReadableStream } from 'node:stream/web';

import KeepAliveAgent from 'agentkeepalive';
import { FormDataEncoder } from 'form-data-encoder';

import { File } from '../_polyfills/File';
import { type RequestOptions } from '../types';
import { MultipartBody } from './MultipartBody';
import { type Shims } from './registry';

const defaultHttpAgent: Agent = new KeepAliveAgent({
  keepAlive: true,
  timeout: 5 * 60 * 1000,
});
const defaultHttpsAgent: Agent = new KeepAliveAgent.HttpsAgent({
  keepAlive: true,
  timeout: 5 * 60 * 1000,
});

async function getMultipartRequestOptions<
  T extends NonNullable<unknown> = Record<string, unknown>,
>(
  form: globalThis.FormData,
  opts: RequestOptions<T>,
): Promise<RequestOptions<T>> {
  const encoder = new FormDataEncoder(form);
  const readable = Readable.from(encoder);
  const body = new MultipartBody(readable);

  const headers = {
    ...opts.headers,
    ...encoder.headers,
    'Content-Length': encoder.contentLength,
  };

  return { ...opts, body: body as any, headers };
}

export function getRuntime(): Shims {
  return {
    kind: 'node',
    getMultipartRequestOptions,
    getDefaultAgent: (url: string): Agent =>
      url.startsWith('https') ? defaultHttpsAgent : defaultHttpAgent,
    isFsReadStream: (value: any): value is FsReadStream =>
      value instanceof FsReadStream,

    // Added in: v16.15.0
    fetch: globalThis.fetch,
    Request: globalThis.Request,
    Response: globalThis.Response,
    Headers: globalThis.Headers,
    FormData: globalThis.FormData,

    // Added in: v18.0.0
    Blob: globalThis.Blob,
    ReadableStream,

    // Added in: v20.0.0
    File: globalThis.File || File,
  };
}
