const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    if (err.details.has('body')) {
      res.status(400).send({ message: `Переданы некорректные данные: ${err.details.get('body').details[0].message}` });
      return;
    }
    if (err.details.has('params')) {
      res.status(400).send({ message: `Переданы некорректные данные: ${err.details.get('params').details[0].message}` });
      return;
    }
  }

  if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким email уже зарегестрирован' });
    return;
  }

  switch (err.name) {
    case 'CastError':
      res.status(400).send({ message: 'Переданы некорректные данные' });
      break;

    case 'ValidationError':
      res.status(400).send({ message: 'Переданы некорректные данные' });
      break;

    case 'DataNotFoundError':
      res.status(404).send({ message: err.message });
      break;

    case 'TokeIsIncorrectError':
      res.status(401).send({ message: err.message });
      break;

    default:
      res.status(500).send({ message: `На сервере произошла ошибка: ${err}` });
  }
  next();
};
