import 'reflect-metadata';
import { Keys } from './Keys';

export function validator(...properties: string[]): Function {
  return function(target: any, key: string): void {
    Reflect.defineMetadata(Keys.Validator, properties, target, key);
  };
}
