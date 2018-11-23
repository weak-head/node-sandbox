const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('<form action="/message" method="POST"> \
                <input type="text" name="msg"> \
                <button type="submit">Send</button> \
              </form>');
});

router.post('/', (req, res, next) => {
    console.log('-> ' + JSON.stringify(req.body) + ' <-\n');
    res.redirect('/message');
});


module.exports = router;