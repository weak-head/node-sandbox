const { validationResult } = require('express-validator/check');

exports.getComments = (req, res, next) => {
    console.log('get');

    res.status(200).json('ok');
};

exports.postComment = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    const title   = req.body.title;
    const content = req.body.content;

    console.log(`post ${title} -> ${content}`);

    res.status(201).json('ok');
};