const { validationResult } = require('express-validator/check');

const users = [];

exports.postSignup = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const pwd   = req.body.password;

    const user = {email: email, password: pwd};
    users.push(user);
    console.log(`signed up: ${JSON.stringify(user)}`);

    res.status(201).json('OK');
};

exports.postLogin = (req, res, next) => {

};

exports.postLogout = (req, res, next) => {

};

exports.isKnownUser = email => {
   return users.find(itm => itm.email === email) !== undefined;
}