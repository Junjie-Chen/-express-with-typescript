import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { Router } from './Router';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['express with typescript'] }));
app.use(Router.createRouter());
