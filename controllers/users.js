const User = require('../models/user');
const DataNotFoundError = require('../utils/Errors/DataNotFoundError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(() => {
      throw new DataNotFoundError('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err, user) => {
      if (!user && err.name !== 'ValidationError') {
        next(new DataNotFoundError('Пользователь не найден'));
      }
      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err, user) => {
      if (!user && err.name !== 'ValidationError') {
        next(new DataNotFoundError('Пользователь не найден'));
      }
      next(err);
    });
};
