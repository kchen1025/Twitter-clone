import * as express from 'express';
// import Account from '../../controllers/Account.controller';

export const apiRouter = express.Router();

// just an example route
apiRouter.get('/', async (req, res) => {
  // const AccountController = Account();
  // const accounts = await AccountController.findAll({where: {id: 1}});
  res.send(req.user);

  // const newAccount = await AccountController.create({ username: 'sdfdsfsd', email: 'whsedrfssdf', name:'cool' });
  // res.send(newAccount);
});

// GET /tweet  get all tweets???
// GET /tweet/<id> get tweet id
// POST /tweet posts tweet from user
