const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../utils/config');

const AuthorizationError = require('../errors/AuthorizationError');

const { NEED_AUTH } = require('../utils/errorMessage');


const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError(NEED_AUTH);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new AuthorizationError(NEED_AUTH);
  }

  req.user = payload;

  return next();
};


module.exports = auth;
