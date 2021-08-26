const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../utils/config');


const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log('Необходимо авторизоваться - 1');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    console.log('Необходимо авторизоваться - 2');
  }

  req.user = payload;

  return next();
};


module.exports = auth;
