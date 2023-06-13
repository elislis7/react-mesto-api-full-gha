const router = require('express').Router();

const {
  getAllCards,
  createCard,
  removeCard,
  likeCard,
  removeLikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCardById,
} = require('../middlewares/validations');

router.get('/cards', getAllCards);
router.post('/cards', validationCreateCard, createCard);
router.delete('/cards/:cardId', validationCardById, removeCard);
router.put('/cards/:cardId/likes', validationCardById, likeCard);
router.delete('/cards/:cardId/likes', validationCardById, removeLikeCard);

module.exports = router;
