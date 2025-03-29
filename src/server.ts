import express from 'express';
import morgan from 'morgan';

import appRoutes from './routes';
import {connectMongoose} from './database';

const app = express();

app.use(express.json({limit: '10mb'}));
app.use(
  morgan((tokens, req, res) => {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status_code: tokens.status(req, res),
      content_length: tokens.res(req, res, 'content-length'),
      duration: `${tokens['response-time'](req, res)}ms`,
    });
  })
);

app.use('/v1', appRoutes);

connectMongoose();

export default app;
