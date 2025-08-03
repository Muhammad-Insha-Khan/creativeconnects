const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');

const router = express.Router();

// Route for sending messages
router.post('/send', sendMessage);

// Route for getting messages between users
router.get('/messages', getMessages);

module.exports = router;
