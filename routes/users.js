const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, createUser, updateUserProfile, updateUserAvatar, getUserMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserMe);

router.get('/:id', getUser);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    about: Joi.string(),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
