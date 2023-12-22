import { type Readable } from './_shims/index';
import { HttpException } from './error';
import type { Fetch, KeysEnum, RequestOptions } from './types';

export {
  maybeMultipartFormRequestOptions,
  multipartFormRequestOptions,
  createForm,
  type Uploadable,
} from './uploads';

export const safeJSON = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    return undefined;
  }
};

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

// https://stackoverflow.com/a/34491287
export function isEmptyObj(
  obj: NonNullable<unknown> | null | undefined,
): boolean {
  if (!obj) return true;
  for (const _k in obj) return false;
  return true;
}

// https://eslint.org/docs/latest/rules/no-prototype-builtins
export function hasOwn(obj: NonNullable<unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function debug(action: string, ...args: any[]) {
  if (typeof process !== 'undefined' && process.env['DEBUG'] === 'true') {
    console.log(`DINGTALK:DEBUG:${action}`, ...args);
  }
}

/**
 * https://stackoverflow.com/a/2117523
 */
export const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// https://stackoverflow.com/a/19709846
const startsWithSchemeRegexp = new RegExp('^(?:[a-z]+:)?//', 'i');

export const isAbsoluteURL = (url: string): boolean => {
  return startsWithSchemeRegexp.test(url);
};

// This is required so that we can determine if a given object matches the RequestOptions
// type at runtime. While this requires duplication, it is enforced by the TypeScript
// compiler such that any missing / extraneous keys will cause an error.
const requestOptionsKeys: KeysEnum<RequestOptions> = {
  method: true,
  path: true,
  query: true,
  body: true,
  headers: true,
  duplex: true,

  maxRetries: true,
  stream: true,
  timeout: true,
  httpAgent: true,
  signal: true,
  idempotencyKey: true,

  __binaryResponse: true,
};

export const isRequestOptions = (
  obj: unknown,
): obj is RequestOptions<Record<string, unknown> | Readable> => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !isEmptyObj(obj) &&
    Object.keys(obj).every(k => hasOwn(requestOptionsKeys, k))
  );
};

export const createResponseHeaders = (
  headers: Awaited<ReturnType<Fetch>>['headers'],
): Record<string, string> => {
  return new Proxy(
    Object.fromEntries(
      // @ts-ignore
      headers.entries(),
    ),
    {
      get(target, name) {
        const key = name.toString();
        return target[key.toLowerCase()] || target[key];
      },
    },
  );
};

export const validatePositiveInteger = (name: string, n: unknown): number => {
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new HttpException(`${name} must be an integer`);
  }
  if (n < 0) {
    throw new HttpException(`${name} must be a positive integer`);
  }
  return n;
};
