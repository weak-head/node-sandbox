const express = require('express');
const router  = express.Router();

const { body } = require('express-validator/check');

const commentController = require('../controllers/comment');

router.get('/', commentController.getComments);

router.post('/create', [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 10})
], commentController.postComment);

module.exports = router;