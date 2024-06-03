const express = require('express');
const authController = require('../controlere/autentificareController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/home', authController.home);

module.exports = router;
