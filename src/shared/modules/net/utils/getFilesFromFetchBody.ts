import { FetchParams } from "../api/api.types";

/**
 * Возвращает объект, который содержит только те поля из исходного объекта, которые являются файлами
 * @param obj Исходный объект, в котором производится поиск
 * @returns Новый объект, содержащий только поля с файлами
 */
export function getFilesFromFetchBody(obj: FetchParams['body']): null | Record<string, File> {
    const files: Record<string, File> = {};
  
    if (typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof File) {
          files[key] = <File>obj[key];
        }
      });
    }
  
    return Object.keys(files).length ? files : null;
  }