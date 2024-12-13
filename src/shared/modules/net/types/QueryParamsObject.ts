type TOrArr<T> = T | T[];
export type QueryParamsObject = Record<
  string,
  TOrArr<string | number | boolean | undefined>
>;