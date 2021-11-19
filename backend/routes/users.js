const userRouter = require('express').Router();

const { updateUserValid } = require('../utils/validation');

const { getUser, updateUser } = require('../controllers/users');

userRouter.get('/users/me', getUser);

userRouter.patch('/users/me', updateUserValid, updateUser);


module.exports = userRouter;
