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
], authController.validationHandler, authController.postSignup);

authRouter.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, {req}) => {
            if (!authController.isKnownUser(value)){
                return Promise.reject('User with this email does not exist');
            }
            return true;
        })
        .normalizeEmail()
], authController.validationHandler, authController.postLogin);

module.exports = authRouter;