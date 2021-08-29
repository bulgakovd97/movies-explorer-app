const router = require('express').Router();

const { registerValid, loginValid } = require('../utils/validation');

const { register, login } = require('../controllers/users');

const auth = require('../middlewares/auth');

const userRouter = require('./users');

const movieRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

const { ROUTE_WRONG } = require('../utils/errorMessage');


router.post('/signup', registerValid, register);

router.post('/signin', loginValid, login);

router.use(auth);

router.use('/', userRouter);

router.use('/', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(ROUTE_WRONG));
});


module.exports = router;
