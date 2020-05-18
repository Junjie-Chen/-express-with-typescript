import { Request, Response } from 'express';

export class RootController {
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
}
