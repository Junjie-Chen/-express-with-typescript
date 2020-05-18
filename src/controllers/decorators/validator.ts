import 'reflect-metadata';
import { RequestHandlerDescriptor } from '../../interfaces/RequestHandlerDescriptor';
import { Keys } from './Keys';

export function validator(...properties: string[]): Function {
  return function(target: any, key: string, desc: RequestHandlerDescriptor): void {
    Reflect.defineMetadata(Keys.Validator, properties, target, key);
  };
}
