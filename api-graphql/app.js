const express         = require('express');

const graphqlHttp     = require('express-graphql');
const graphqlSchema   = require('./graphql/schema/schema');
const graphqlResolver = require('./graphql/resolvers/resolvers');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema.loadSchema(),
    rootValue: graphqlResolver
}));

app.listen(8080);