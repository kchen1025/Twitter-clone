import bodyParser = require('body-parser');
const cookieSession  = require('cookie-session');
import * as dotenv from 'dotenv';
import express = require('express');
import session = require('express-session');
import * as morgan from 'morgan';
import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import AccountController from './controllers/Account.controller';
import { errorHandler } from './middlewares';
import {initDb} from './models';
import { apiRouter } from './routes/api';

dotenv.config();

const app = express();

app.use(cookieSession({maxAge: 30 * 24 * 60 * 60 * 1000, keys: ['sdfsdfdsfdsdsfsdfdsfaertasdfadsrfsd']}));
app.use(passport.initialize());
app.use(passport.session());

// server-side authentication setup
passport.serializeUser((user: Account, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const Account = AccountController();
  const existingUser = await Account.findAll({where: {id}});
  done(null, existingUser[0].toJSON());
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || 'whatever',
  clientSecret: process.env.GOOGLE_SECRET || 'whatever',
  callbackURL: '/auth/google/callback'
},  async (accessToken, refreshToken, profile, done) => {
  console.log('accesstoken', accessToken, refreshToken, profile);
  const Account = AccountController();
  const existingUser = await Account.findAll({where: {google_id: profile.id}});

  // look for this profile.id in our database. if it doesn't exist, create one.
  // if it does, sign in
  if (existingUser?.length) {
    done(null, existingUser[0].toJSON());
  }

  // doesn't exist, create it
  const email = profile?.emails?.filter((x) => x)[0].value;
  const newAccount = await Account.create({
    username: profile.displayName,
    google_id: profile.id,
    email,
    name: profile.displayName
  });
  done(null, newAccount[0].toJSON());
}));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

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
