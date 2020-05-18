import 'reflect-metadata';
import { Keys } from './Keys';

export function createRoute(method: string): Function {
  return function(path: string): Function {
    return function(target: any, key: string): void {
      Reflect.defineMetadata(Keys.Method, method, target, key);

      Reflect.defineMetadata(Keys.Path, path, target, key);
    };
  };
}
