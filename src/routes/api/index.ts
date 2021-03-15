import * as express from 'express';
// import Account from '../../controllers/Account.controller';
import { db } from '../../models';

export const apiRouter = express.Router();

// just an example route
apiRouter.get('/', async (req, res) => {
  const accounts = await db.account.findAll();
  console.log(accounts);
  res.send(accounts);
});

// GET /tweet  get all tweets???
// GET /tweet/<id> get tweet id
// POST /tweet posts tweet from user
