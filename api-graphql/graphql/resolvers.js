const userResolver = require('./resolvers/user');
const authResolver = require('./resolvers/auth');

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