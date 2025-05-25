const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/userController');


router.post('/login', loginUsuario);
router.post('/register', registrarUsuario);

module.exports = router;


