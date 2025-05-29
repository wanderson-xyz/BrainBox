const express = require('express');
const router = express.Router();
const {getCards, createCard, getCardById, deleteCard, updateCard, searchCards} = require('../controllers/card.controllers');
const autenticar = require('../controllers/authMiddleware');

router.get('/', autenticar, getCards);
router.post('/', autenticar, createCard);
router.get('/search',autenticar, searchCards);
router.get('/:id', autenticar, getCardById);
router.delete('/:id',autenticar, deleteCard);
router.put('/:id',autenticar, updateCard);


module.exports = router;

