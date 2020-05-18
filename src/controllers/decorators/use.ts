import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Keys } from './Keys';

export function use(middleware: RequestHandler): Function {
  return function(target: any, key: string): void {
    const middlewares = Reflect.getMetadata(Keys.Middleware, target, key) || [];

    Reflect.defineMetadata(Keys.Middleware, [...middlewares, middleware], target, key);
  };
}
