import bodyParser = require('body-parser');
const cookieSession  = require('cookie-session');
import * as dotenv from 'dotenv';
import express = require('express');
import session = require('express-session');
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as path from 'path';
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

app.use(express.static('public')); // for POST requests, it attaches the body returned to req.body (express does not do this by default)
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

/**
 * This line is here specifically for production deploys (unnecessary for development which is why it is hardcoded to production)
 *
 * Development explanation: In development we have webpack-dev-server which serves up our front end files separately from our backend server.
 * we can run them independently and require no extra configuration from the backend
 *
 * Prod explanation: in prod, webpack-dev-server doesn't exist. Instead we need to build our front end into a bundle.js file, and be able to serve it from
 * our express server.  The reaseon for this is that we have frontend routes through react-router, and backend routes through express
 * the line below is saying "i have no idea what this new route is, lets fetch the react bundle from within our public directory, and try to see if that route exists there"
 * this is unnecessary in development because of our proxies, where the react app lives on 8080, and the server on 3000. When working with the frontend of our app, by default we
 * will look in 8080 for routes, and specially defined routes in webpack will change the domain from localhost:8080 -> localhost:3000 and look in our backend.
 */
if ( process.env.NODE_ENV === 'production') {
  // express will serve up assets like our main.js file, css, or even icons and such
  app.use(express.static('public/dist'));

  // express will serve up index.html file (therefore our react app) if it doesn't recognize our route and tries to execute the route there.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'dist', 'index.html'));
  });
}

// error handler, parse out specific errors here
app.use(errorHandler);

export {app};
