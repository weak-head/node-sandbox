const express = require('express');
const router  = express.Router();

const messageController = require('../controllers/message');

router.get('/', messageController.getMessages);
router.post('/create', messageController.postMessage);

module.exports = router;