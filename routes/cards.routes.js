const express = require('express');
const router = express.Router();
const {getCards, createCard, getCardById, deleteCard, updateCard} = require('../controllers/card.controllers');

router.get('/', getCards);
router.post('/', createCard);
router.get('/:id', getCardById);
router.delete('/:id', deleteCard);
router.put('/:id', updateCard);

module.exports = router;

