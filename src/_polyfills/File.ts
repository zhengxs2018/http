export interface FilePropertyBag extends BlobPropertyBag {
  /**
   * The last modified date of the file as the number of milliseconds since the Unix epoch (January 1, 1970 at midnight). Files without a known last modified date return the current date.
   */
  lastModified?: number;
}

/**
 * The **File** interface provides information about files and allows JavaScript to access their content.
 */
export class File extends globalThis.Blob {
  static [Symbol.hasInstance](value: unknown): value is File {
    return (
      value instanceof Blob &&
      // @ts-expect-error
      value[Symbol.toStringTag] === 'File' &&
      typeof (value as File).name === 'string'
    );
  }

  /**
   * Returns the name of the file referenced by the File object.
   */
  readonly #name: string;

  /**
   * The last modified date of the file as the number of milliseconds since the Unix epoch (January 1, 1970 at midnight). Files without a known last modified date return the current date.
   */
  readonly #lastModified: number = 0;

  /**
   * Creates a new File instance.
   *
   * @param fileBits - An `Array` strings, or [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [`ArrayBufferView`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView), [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) objects, or a mix of any of such objects, that will be put inside the [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File).
   * @param name - The name of the file.
   * @param options - An options object containing optional attributes for the file.
   */
  constructor(
    fileBits: BlobPart[],
    name: string,
    options: FilePropertyBag = {},
  ) {
    super(fileBits, options);

    if (arguments.length < 2) {
      throw new TypeError(
        "Failed to construct 'File': 2 arguments required, " +
          `but only ${arguments.length} present.`,
      );
    }

    this.#name = String(name);

    // Simulate WebIDL type casting for NaN value in lastModified option.
    const lastModified =
      options.lastModified === undefined
        ? Date.now()
        : Number(options.lastModified);

    if (!Number.isNaN(lastModified)) {
      this.#lastModified = lastModified;
    }
  }

  /**
   * Name of the file referenced by the File object.
   */
  get name(): string {
    return this.#name;
  }

  /* c8 ignore next 3 */
  get webkitRelativePath(): string {
    return '';
  }

  /**
   * The last modified date of the file as the number of milliseconds since the Unix epoch (January 1, 1970 at midnight). Files without a known last modified date return the current date.
   */
  get lastModified(): number {
    return this.#lastModified;
  }

  get [Symbol.toStringTag](): string {
    return 'File';
  }
}
