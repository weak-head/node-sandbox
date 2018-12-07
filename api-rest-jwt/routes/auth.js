const express    = require('express');
const authRouter = express.Router();

const { body, check } = require('express-validator/check');

const authController = require('../controllers/auth');

authRouter.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            if (authController.isKnownUser(value)) {
                return Promise.reject('User with this email address already exists');
            }
            return true;
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 5})
], authController.postSignup);

module.exports = authRouter;