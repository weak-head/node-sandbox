const userResolver = require('./user');
const authResolver = require('./auth');

function hello() {
    return {
        text: 'HW!',
        views: 123
    };
}


module.exports = {
    hello: hello,

    createUser: userResolver.createUser,

    login: authResolver.login
};