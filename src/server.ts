import bodyParser = require('body-parser');
import express = require('express');
import session = require('express-session');
import * as morgan from 'morgan';
import { errorHandler } from './middlewares';
import { apiRouter } from './routes/api';


const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

// avoid 304 not modified
app.get('/*', (req, res, next) => {
  res.setHeader('Last-Modified', new Date().toUTCString());
  next();
});

// log requests
app.use(morgan('tiny'));

// routes go here, pull them out into different files later
app.use('/api', apiRouter);

// error handler, parse out specific errors here
app.use(errorHandler);

export {app};
