const router = require('express').Router();

const { registerValid, loginValid } = require('../utils/validation');

const { register, login } = require('../controllers/users');

const auth = require('../middlewares/auth');

const userRouter = require('./users');

const movieRouter = require('./movies');


router.post('/signup', registerValid, register);

router.post('/signin', loginValid, login);

router.use(auth);

router.use('/', userRouter);

router.use('/', movieRouter);

router.use('*', (req, res, next) => {
  res.status(404).send({ message: 'Маршрут не найден' });

  return next();
});


module.exports = router;
