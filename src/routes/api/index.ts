import * as express from 'express';

export const apiRouter = express.Router();

// just an example route
apiRouter.get('/', (req, res) => {
  res.send('api tesdstdsdfd');
});
