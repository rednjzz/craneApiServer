const express = require('express');
const router = express.Router();
//const graphqlHTTP = require('express-graphql');
// const { ApolloServer } = require('apollo-server-express');
// const schema = require('../graphql/schema');

// const cors = require('cors');
// const typeDefs = require('../graphql/typedefs');
// const resolvers = require('../graphql/resolvers');

// router.use(cors());

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// })

// server.applyMiddleware( { express })

// router.use('/i', graphiqlExpress({
//   endpointURL: '/api/graphql/i'
// }) )

// router.use('/', graphqlHTTP({
//   schema: schema,
//   rootValue: resolver,
//   graphiql: true,
// }));

module.exports = router;