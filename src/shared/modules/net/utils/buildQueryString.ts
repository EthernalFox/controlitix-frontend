import { QueryParamsObject } from "../types/QueryParamsObject";

/**
 * Превращает объект в query параметры
 * @example
 * ```
 * buildQueryString({ foo: 1, bar: false })
 * //=> '?foo=1&bar=false'
 *
 * queryString(undefined);
 * //=> ''
 * ```
 * @param {QueryParamsObject} obj Простой объект (без вложенных объектов и массивов)
 * @returns {string} Строка query
 */
export function buildQueryString(obj?: QueryParamsObject): string {
  if (!obj) {
    return '';
  }

  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    } else {
      obj[key] = obj[key]?.toString();
    }
  });

  return new URLSearchParams(<Record<string, string>>obj).toString();
}
