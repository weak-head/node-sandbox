const validator = require('validator');

class ModelValidator {
    constructor(model) {
        this.model  = model;
        this.errors = [];
    }

    validateEmail(emailAccessor) {
        const email = emailAccessor(this.model);

        if (!validator.isEmail(email)) {
            this.errors.push({
                message: 'Invalid email'
            });
        }

        return this;
    }

    validatePassword(passwordAccessor) {
        const password = passwordAccessor(this.model);

        if (validator.isEmpty(password) ||
           !validator.isLength(password, {min: 5})) {
            this.errors.push({
                message: 'Invalid password'
            });
        }

        return this;
    }

    throwIfErrors() {
        if (this.errors.length > 0) {
            const error = new Error('Invalid model');
            error.data = this.errors;
            error.code = 422;

            throw error;
        }
    }
}

function forModel(model) {
    return new ModelValidator(model);
}

module.exports = {
    forModel: forModel
}