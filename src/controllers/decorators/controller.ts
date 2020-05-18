import { Request, Response, NextFunction, RequestHandler } from 'express';

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
