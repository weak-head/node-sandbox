const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const users = [];

exports.postSignup = (req, res, next) => {

    // in case if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const pwd   = req.body.password;

    // hashing password to avoid any kind of security leaks
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

};

exports.postLogout = (req, res, next) => {

};

exports.isKnownUser = email => {
   return users.find(itm => itm.email === email) !== undefined;
}