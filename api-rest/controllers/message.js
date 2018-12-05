exports.getMessages = (req, res, next) => {
    res.status(200).json({
        messages: [{ title: 'Deeds', body: 'Have been settled' }]
    });
};

exports.postMessage = (req, res, next) => {
    const title = req.body.title;
    const body  = req.body.body;

    res.status(201).json({
        title: title,
        body: body
    });
};