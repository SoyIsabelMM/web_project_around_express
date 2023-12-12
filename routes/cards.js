const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', likeCard);

module.exports = router;
