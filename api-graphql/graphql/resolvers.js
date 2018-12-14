const userResolver  = require('./resolvers/user');
const authResolver  = require('./resolvers/auth');
const topicResolver = require('./resolvers/topic');


function hello() {
    return {
        text: 'HW!',
        views: 123
    };
}


module.exports = {
    hello: hello,

    getTopics: topicResolver.getTopics,
    createTopic: topicResolver.createTopic,

    createUser: userResolver.createUser,

    login: authResolver.login
};