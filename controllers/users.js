const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { jwtSecret } = require('../utils/config');

const NotFoundError = require('../errors/NotFoundError');
const NotValidError = require('../errors/NotValidError');
const EmailError = require('../errors/EmailError');
const AuthorizationError = require('../errors/AuthorizationError');

const {
  NOT_FOUND,
  BAD_REQUEST,
  NO_AUTH,
  EMAIL_EXISTS,
  EMAIL_WRONG,
} = require('../utils/errorMessage');

const { CAST_ERROR, VALID_ERROR, MONGO_ERROR } = require('../utils/errorName');


const getUser = (req, res, next) => {
  const { _id } = req.user;

  User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND);
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        throw new NotValidError(BAD_REQUEST);
      }

      return next(err);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND);
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === VALID_ERROR) {
        throw new NotValidError(BAD_REQUEST);
      } else if (err.name === MONGO_ERROR && err.code === 11000) {
        throw new EmailError(EMAIL_WRONG);
      }

      return next(err);
    })
    .catch(next);
};

const register = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      if (!password) {
        throw new NotValidError(BAD_REQUEST);
      }

      return User.create({
        email,
        password: hash,
        name,
      })
        .then(() => res.status(200).send({ email, name }))
        .catch((err) => {
          if (err.name === VALID_ERROR) {
            throw new NotValidError(BAD_REQUEST);
          } else if (err.name === MONGO_ERROR && err.code === 11000) {
            throw new EmailError(EMAIL_EXISTS);
          }

          next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        jwtSecret,
        { expiresIn: '7d' },
      );

      return res.send({ token });
    })
    .catch((err) => {
      throw new AuthorizationError(NO_AUTH);
    })
    .catch(next);
};


module.exports = {
  getUser,
  updateUser,
  register,
  login,
};
