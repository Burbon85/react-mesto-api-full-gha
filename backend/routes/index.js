const routes = require('express').Router();

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');

const userRouter = require('./user');
const cardRouter = require('./card');

routes.use('/users', auth, userRouter);
routes.use('/cards', auth, cardRouter);
routes.use('*', auth, (req, res, next) => {
  next(new NotFoundError('URL не существует'));
});

module.exports = routes;
