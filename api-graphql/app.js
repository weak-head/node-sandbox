const express         = require('express');

const graphqlHttp     = require('express-graphql');
const graphqlSchema   = require('./graphql/schema/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // GraphQL only supports GET and POST requests,
  // so we need to handle OPTIONS ourselves
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema.loadSchema(),
  rootValue: graphqlResolver,
  graphiql: true,
  formatError(err) {
    if (!err.originalError) {
      return err;
    }

    const data    = err.originalError.data;
    const code    = err.originalError.code || 500;
    const message = err.message || 'An error occurred.';

    return {
      message: message,
      status: code,
      data: data
    };
  }
}));

app.listen(8080);