const express = require('express');
const router  = express.Router();

const commentController = require('../controllers/comment');

router.get('/', commentController.getMessages);
router.post('/create', commentController.postMessage);

module.exports = router;