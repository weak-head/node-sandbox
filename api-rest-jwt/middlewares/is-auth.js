const jwt = require('jsonwebtoken');

const authKey = 'SecretPrivateKey';

const isAuth = (req, res, next) => {
    try
    {
        const authHeader = req.get('Authorization');

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            const verifiedToken = jwt.verify(token, authKey);
            if (verifiedToken) {
                req.userEmail = verifiedToken.email;
                return next();
            }
        }
    } catch (ex) {
        ex.statusCode = 500;
        throw ex;
    }

    const err = new Error('Not authorized');
    err.statusCode = 401;
    throw err;
};

module.exports = {
    isAuth:   isAuth,
    AUTH_KEY: authKey
};