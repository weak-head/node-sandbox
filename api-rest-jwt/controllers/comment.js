exports.getMessages = (req, res, next) => {
    console.log('get');
    res.json('ok');
};

exports.postMessage = (req, res, next) => {
    console.log('post');
    res.json('ok');
};