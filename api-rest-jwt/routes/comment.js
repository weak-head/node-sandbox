const express = require('express');
const router  = express.Router();

const { body } = require('express-validator/check');

const commentController = require('../controllers/comment');

const isAuth = require('../middlewares/is-auth').isAuth;

router.get('/', isAuth, commentController.getComments);

// post route with message body validation
router.post('/create', isAuth, [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 10})
], commentController.postComment);

module.exports = router;