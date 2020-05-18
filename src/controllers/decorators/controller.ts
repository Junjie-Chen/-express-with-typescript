import 'reflect-metadata';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Keys } from './Keys';
import { Methods } from './Methods';
import { Router } from '../../Router';

function validate(properties: string[]): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction): void {
    if (!req.body) {
      res.status(422).send(`Request is not successful as the body property is undefined.`);

      return;
    }

    for (let property of properties) {
      if (!req.body[property]) {
        res.status(422).send(`Request is not successful as the ${property} property is undefined.`);

        return;
      }
    }

    next();
  };
}

export function controller(prefix: string): Function {
  return function(target: Function): void {
    const router = Router.createRouter();

    for (let key in target.prototype) {
      const method: Methods = Reflect.getMetadata(Keys.Method, target.prototype, key);

      const path = Reflect.getMetadata(Keys.Path, target.prototype, key);

      const middlewares = Reflect.getMetadata(Keys.Middleware, target.prototype, key) || [];

      const properties = Reflect.getMetadata(Keys.Validator, target.prototype, key) || [];

      const validator = validate(properties);

      const requestHandler = target.prototype[key];

      if (path) {
        router[method](`${prefix}${path}`, ...middlewares, validator, requestHandler);
      }
    }
  };
}
