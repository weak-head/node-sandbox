const jwt = require('jsonwebtoken');

const PrivateKey = 'PrivateKey';

async function login({ email, password }) {
    if (email !== 'admin@email.domain' || password !== 'password') {
        const error = new Error('Invalid credentials');
        error.code = 401;
        throw error;
    }

    const token = jwt.sign({
        userId: '1',
        email: email
    }, PrivateKey, {
        expiresIn: '1h'
    });

    return {
        userId: '1',
        token: token
    };
}

module.exports = {
    login: login,
    PrivateKey: PrivateKey
}