import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [property: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.isLoggedIn) {
    next();

    return;
  }

  res.status(403).send('You are not permitted to visit this page.');
}

const router = Router();

router.get('/', (req: Request, res: Response): void => {
  if (req.session && req.session.isLoggedIn) {
    res.send(`
      <div>
        <div>You are logged in.</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div>You are not logged in.</div>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get('/login', (req: Request, res: Response): void => {
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
});

router.post('/login', (req: RequestWithBody, res: Response): void => {
  const { email, password } = req.body;

  if (email && password && email === 'express@typescript.com' && password === 'expresswithtypescript') {
    req.session = { isLoggedIn: true };

    res.redirect('/');
  } else {
    res.send('You provided an invalid email or password.');
  }
});

router.get('/logout', (req: Request, res: Response): void => {
  req.session = undefined;

  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response): void => {
  res.send('You are permitted to visit this page.');
});

export { router };
