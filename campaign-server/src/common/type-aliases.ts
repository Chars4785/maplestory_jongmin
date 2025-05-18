export type Nullable<T> = T | null;
export type NullishArg<T> = Nullable<T> | undefined;
export type NullableAsync<T> = Promise<Nullable<T>>;

export type Throwable<T> = T | never;
export type ThrowableAsync<T> = Promise<T> | never;

/**
 * copy from typeorm
 * Interface of the simple literal object with any string keys.
 */
export interface ObjectLiteral {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

export type DecoratorReturnType = (target: object, propertyKey?: string | symbol) => void;

export type ArrayItemType<T> = T extends Array<infer U> ? U : never;
