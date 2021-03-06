import * as express from 'express';
import * as passport from 'passport';

export const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

authRouter.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
