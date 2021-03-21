import * as express from 'express';
// import Account from '../../controllers/Account.controller';
import { requireLogin } from '../../middlewares';

export const apiRouter = express.Router();

// requireLogin is used to protect our route and return a 401 when we are not logged in 
apiRouter.get('/', requireLogin, async (req, res) => {
  // const AccountController = Account();
  // const accounts = await AccountController.findAll({where: {id: 1}});
  res.send(req.user);

  // const newAccount = await AccountController.create({ username: 'sdfdsfsd', email: 'whsedrfssdf', name:'cool' });
  // res.send(newAccount);
});

apiRouter.get('/current_user', (req, res) => {
  res.send(req.user);
});

// GET /tweet  get all tweets???
// GET /tweet/<id> get tweet id
// POST /tweet posts tweet from user
