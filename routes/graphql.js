const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');

const cors = require('cors');
const schema = require('../graphql/typedef');
const resolver = require('../graphql/resolver');

router.use(cors());

router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}));

module.exports = router;