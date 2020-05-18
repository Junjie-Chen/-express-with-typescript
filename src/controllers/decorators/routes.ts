import 'reflect-metadata';
import { Keys } from './Keys';
import { Methods } from './Methods';

export function createRoute(method: string): Function {
  return function(path: string): Function {
    return function(target: any, key: string): void {
      Reflect.defineMetadata(Keys.Method, method, target, key);

      Reflect.defineMetadata(Keys.Path, path, target, key);
    };
  };
}

export const get = createRoute(Methods.Get);
export const post = createRoute(Methods.Post);
export const put = createRoute(Methods.Put);
export const patch = createRoute(Methods.Patch);
export const del = createRoute(Methods.Delete);
