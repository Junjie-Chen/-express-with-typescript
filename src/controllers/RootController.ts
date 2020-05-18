import { Request, Response, NextFunction } from 'express';
import { get } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.isLoggedIn) {
    next();

    return;
  }

  res.status(403).send('You are not permitted to visit this page.');
}

export class RootController {
  @get('/')
  getRoot(req: Request, res: Response): void {
    if (req.session && req.session.isLoggedIn) {
      res.send(`
        <div>
          <div>You are logged in.</div>
          <a href="/auth/logout">Logout</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
          <div>You are not logged in.</div>
          <a href="/auth/login">Login</a>
        </div>
      `);
    }
  }

  @get('/protected')
  getProtected(req: Request, res: Response): void {
    res.send('You are permitted to visit this page.');
  }
}
