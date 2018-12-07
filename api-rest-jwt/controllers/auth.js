const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

const TOKEN_KEY = 'SecretPrivateKey';

const users = [];

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const pwd   = req.body.password;

    // hashing password to avoid any kind of privacy leaks
    bcrypt
        .hash(pwd, 12)
        .then(hashedPwd => {
            const user = {
                email: email,
                password: hashedPwd
            };

            users.push(user);
            console.log(`signed up: ${JSON.stringify(user)}`);

            res.status(201)
               .json('OK');
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const pwd   = req.body.password;

    const theUser = users.find(usr => usr.email === email);

    // not found
    if (!theUser) {
        const err = new Error('User does not exist');
        err.statusCode = 401;
        throw err;
    }

    // compare user password and generate token
    bcrypt
        .compare(pwd, theUser.password)
        .then(isCorrect => {
            if (!isCorrect) {
                const err = new Error('Invalid password');
                err.statusCode = 401;
                throw err;
            }

            const token = jwt.sign(
                {
                    email: theUser.email
                },
                TOKEN_KEY,
                {
                    expiresIn: '1h'
                });

            res.status(200).json({ token: token })
        })
        .catch(error => {
            const err = new Error('Internal server error');
            err.statusCode = 500;
            throw err;
        });
};

exports.postLogout = (req, res, next) => {

};

exports.isKnownUser = email => {
   return users.find(itm => itm.email === email) !== undefined;
};

exports.validationHandler = (req, res, next) => {
    // in case if validation fails
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    next();
};