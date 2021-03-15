import bodyParser = require('body-parser');
import * as dotenv from 'dotenv';
import express = require('express');
import session = require('express-session');
import * as morgan from 'morgan';
import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { errorHandler } from './middlewares';
import {initDb} from './models';
import { apiRouter } from './routes/api';

dotenv.config();

const app = express();

// server-side authentication setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || 'whatever',
  clientSecret: process.env.GOOGLE_SECRET || 'whatever',
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  console.log('accesstoken', accessToken, refreshToken, profile);

  // look for this profile.id in our database. if it doesn't exist, create one.
  // if it does, sign in

  // to continue, call 'done' which takes in error, then the value you want to pass
}));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'));

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

// error handler, parse out specific errors here
app.use(errorHandler);

export {app};
