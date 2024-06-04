const express = require('express');
const chatController = require('./chatController');
const router = express.Router();

router.get('/messages', chatController.getAllMessages);
router.post('/messages', chatController.addMessage);

module.exports = router;

