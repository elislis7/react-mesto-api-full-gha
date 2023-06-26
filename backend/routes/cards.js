const router = require('express').Router();

const {
  getAllCards,
  createCard,
  removeCard,
  addLikeCard,
  removeLikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCardById,
} = require('../middlewares/validations');

router.get('/', getAllCards);
router.post('/', validationCreateCard, createCard);
router.delete('/:cardId', validationCardById, removeCard);
router.put('/:cardId/likes', validationCardById, addLikeCard);
router.delete('/:cardId/likes', validationCardById, removeLikeCard);

module.exports = router;
