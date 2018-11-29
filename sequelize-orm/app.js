const express = require('express');
const app = express();

const db = require('./db');
const product = require('./models/product');

db.sync()
  .then(result => {
      console.log('\n> running on 3000');
      app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });