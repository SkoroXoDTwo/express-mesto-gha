const jwt = require('jsonwebtoken');
const TokeIsIncorrectError = require('../errors/TokeIsIncorrectError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new TokeIsIncorrectError());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new TokeIsIncorrectError());
  }

  req.user = payload;
  next();
};
