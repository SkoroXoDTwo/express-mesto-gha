const router = require('express').Router();
const { validationCreateCard, validationParamsHandlerCard } = require('../utils/validation');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', validationCreateCard, createCard);

router.delete('/:cardId', validationParamsHandlerCard, deleteCard);

router.put('/:cardId/likes', validationParamsHandlerCard, likeCard);

router.delete('/:cardId/likes', validationParamsHandlerCard, dislikeCard);

module.exports = router;
