
export const assertNever = (val: never, throwErr = false): void => {
  if (throwErr) throw new Error(`Never error: ${val}`);
};

// * https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
const brand = Symbol('brand');
const flavor = Symbol('flavor');
export type Brand<U extends symbol, T> = {[brand]: U} & T;
export type Flavor<U extends symbol, T> = {[flavor]?: U} & T;
