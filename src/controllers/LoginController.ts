import { Request, Response } from 'express';

export class LoginController {
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (email === 'express@typescript.com' && password === 'expresswithtypescript') {
      req.session = { isLoggedIn: true };

      res.redirect('/');
    } else {
      res.send('You provided an invalid email or password.');
    }
  }

  getLogout(req: Request, res: Response): void {
    req.session = undefined;

    res.redirect('/');
  }
}