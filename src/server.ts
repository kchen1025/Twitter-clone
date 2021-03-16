import bodyParser = require('body-parser');
const cookieSession  = require('cookie-session');
import * as dotenv from 'dotenv';
import express = require('express');
import session = require('express-session');
import * as morgan from 'morgan';
import * as passport from 'passport';
import { errorHandler } from './middlewares';
import {initDb} from './models';
import { apiRouter } from './routes/api';
import { authRouter } from './routes/auth';
require('./services/passport');
dotenv.config();

const app = express();

app.use(cookieSession({maxAge: 30 * 24 * 60 * 60 * 1000, keys: ['sdfsdfdsfdsdsfsdfdsfaertasdfadsrfsd']}));
app.use(passport.initialize());
app.use(passport.session());

// BEGIN initialize sequelize connection
const db = initDb();
db.sequelize.sync();
// END sequelize initialization

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
app.use('/auth', authRouter);

// error handler, parse out specific errors here
app.use(errorHandler);

export {app};
