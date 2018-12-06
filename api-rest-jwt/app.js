const express = require('express');
const app     = express();
const path    = require('path');

const commentRouter = require('./routes/comment');

const multer      = require('multer');
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));


app.use('/api/comments', commentRouter);


app.use((req, res, next) => {
    res.status(404).send('Not found');
});

app.listen(8080);