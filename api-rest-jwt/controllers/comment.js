const { validationResult } = require('express-validator/check');

exports.getComments = (req, res, next) => {
    console.log('get');

    res.status(200).json('ok');
};

exports.postComment = (req, res, next) => {
    const errors = validationResult(req);

    // request body validation check
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    // attached image
    if (req.file) {
        console.log(req.file);
    }

    const title   = req.body.title;
    const content = req.body.content;

    console.log(`post ${title} -> ${content}`);

    res.status(201).json('ok');
};