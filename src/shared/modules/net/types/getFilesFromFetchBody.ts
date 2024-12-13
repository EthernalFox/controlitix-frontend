import { FetchParams } from "../api/api.types";

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