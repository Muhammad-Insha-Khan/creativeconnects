const express = require('express');
const router = express.Router();
const { chatSearchHandler } = require('../controllers/chatSearchController');

router.post('/chat-search', chatSearchHandler);

module.exports = router;
