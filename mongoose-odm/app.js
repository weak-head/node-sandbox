const express = require('express');
const app = express();

const Product = require('./models/product');

const mongoose = require('mongoose');
const conStr   = 'mongodb://localhost:27017/mongoose-db';
const authOpt  = {
    user: 'root',
    pass: 'example',
    auth: {
        authdb: 'admin'
    }
};

app.use(express.json());

app.post('/api/products', (req, res, next) => {
    const title       = req.body.title;
    const imageUrl    = req.body.imageUrl;
    const price       = req.body.price;
    const description = req.body.description;

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl
    });

    product.save()
        .then(result => {
            res.status(200).send(JSON.stringify({
                id: result._id
            }));
        })
        .catch(err => {
            res.status(500).send('Err!');
        });
});

app.get('/api/products', (req, res, next) => {
    Product.find()
        .then(products => {
            res.send(products);
        })
        .catch(err => {
            res.status(500).send('Ahr!');
        });
});

app.get('/api/products/:productId', (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .then(product => {
            res.send(product);
        })
        .catch(err => {
            res.status(500).send('Bang!');
        });
});

app.put('/api/products/:productId', (req, res, next) => {
    const productId   = req.params.productId;
    const title       = req.body.title;
    const imageUrl    = req.body.imageUrl;
    const price       = req.body.price;
    const description = req.body.description;

    Product.findById(productId)
        .then(product => {
            product.title       = title;
            product.imageUrl    = imageUrl;
            product.price       = price;
            product.description = description;

            product.save();
        })
        .then(result => {
            res.send('OK');
        })
        .catch(err => {
            res.status(500).send('Boom!');
        });
});

app.delete('/api/products/:productId', (req, res, next) => {
    const productId = req.params.productId;

    Product.findOneAndRemove(productId)
        .then(result => {
            res.send('OK');
        })
        .catch(err => {
            res.status(500).send('Crash!');
        });
});

mongoose.connect(conStr, authOpt)
    .then(result => {
        console.log('The app is running on 3000...');
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
