import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { router } from './routes/routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['express with typescript'] }));
app.use(router);

app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});
