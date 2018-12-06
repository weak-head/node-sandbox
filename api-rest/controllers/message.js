exports.getMessages = (req, res, next) => {
    console.log('get messages');
    res.status(200).json({
        messages: [{ title: 'Deeds', body: 'Have been settled' }]
    });
};

exports.postMessage = (req, res, next) => {
    const title = req.body.title;
    const body  = req.body.body;

    console.log(`create message: [${title}] - [${body}]`);
    res.status(201).json({
        title: title,
        body: body
    });
};