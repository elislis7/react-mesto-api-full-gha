const router = require('express').Router();

const users = require('./users');
const cards = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

router.use('/users', users);
router.use('/cards', cards);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Ошибка! Данные не найдены!'));
});

module.exports = router;
