const express = require('express');
const app = express();

const db = require('./db');
const Product = require('./models/product');

app.use(express.json());

app.post('/api/products', (req, res, next) => {
    const title       = req.body.title;
    const imageUrl    = req.body.imageUrl;
    const price       = req.body.price;
    const description = req.body.description;

    Product.create({
        title:       title,
        price:       price,
        imageUrl:    imageUrl,
        description: description
    })
    .then(result => {
        res.status(200).send('OK');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Oops");
    });
});

app.put('/api/products/:productId', (req, res, next) => {
    const prodId      = req.params.productId;
    const title       = req.body.title;
    const imageUrl    = req.body.imageUrl;
    const price       = req.body.price;
    const description = req.body.description;

    Product.findByPk(prodId)
        .then(product => {
            product.title       = title;
            product.imageUrl    = imageUrl;
            product.price       = price;
            product.description = description;
            return product.save();
        })
        .then(result => {
            console.log('Updated');
            //res.redirect(`/api/products/${prodId}`);
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Bang!');
        });
});

app.delete('/api/products/:productId', (req, res, next) => {
    const productId = req.params.productId;

    Product.findByPk(productId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log(err);
            res.send(500).send('Boom!');
        });
});

app.get('/api/products', (req, res, next) => {
    Product.findAll()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Err!');
        });
});

app.get('/api/products/:productId', (req, res, next) => {
    const prodId = req.params.productId;

    Product.findByPk(prodId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(500).send('Ahrr!');
        });
});

db.sync()
  .then(result => {
      console.log('\n> running on 3000');
      app.listen(3000);
  })
  .catch(err => {
      console.log('Could not connect to the db, terminating...');
      console.log(err);
  });