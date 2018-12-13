const { forModel } = require('./validation');

function hello() {
    return {
        text: 'HW!',
        views: 123
    };
}

function createUser(args, req) {

    forModel(args.userInput)
        .validateEmail(model => model.email)
        .validatePassword(model => model.password)
        .throwIfErrors();

    const email = args.userInput.email;
    const name  = args.userInput.name;
    const pwd   = args.userInput.password;

    const user = {
        email: email,
        name: name,
        password: pwd,
        _id: 1
    };

    return user;
};


module.exports = {
    hello: hello,
    createUser: createUser
};