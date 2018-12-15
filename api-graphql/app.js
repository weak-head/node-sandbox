const express         = require('express');
const jwt             = require('jsonwebtoken');

const { PrivateKey }  = require('./graphql/resolvers/auth');

const fileHandler     = require('./file_upload');

const graphqlHttp     = require('express-graphql');
const graphqlSchema   = require('./graphql/schema/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();


// Access Control
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


// Authorization
app.use((req, res, next) => {
  req.auth = { isAuth: false };

  const authHeader = req.get('Authorization');
  if (authHeader) {
    try {
      const token         = authHeader.split(' ')[1];
      const verifiedToken = jwt.verify(token, PrivateKey);

      if (verifiedToken) {
        req.auth.isAuth    = true;
        req.auth.userEmail = verifiedToken.email;
      }
    } catch (error) {
      console.log(error);
    }
  }

  next();
});


// Upload files via multi form data
app.use('/upload', fileHandler);
app.post('/upload', (req, res, next) => {
  if (!req.file) {
    return res
      .status(200)
      .json({
        message: 'No file uploaded'
      });
  }

  return res
    .status(201)
    .json({
      message: 'File uploaded',
      filePath: req.file.path
    });
})


// GraphQL API handling
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