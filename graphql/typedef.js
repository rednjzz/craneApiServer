const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: Int!
    email: String!
    nick: String
    provider: String
    snsId: String
  }
  type Post {
    id: Int!
    content: String
    img: String
    userId: Int
    user: User
  }

  type Query {
    hello: String
    users: [User]
    user(id: Int!): User!
    posts: [Post] 
  }
`);

module.exports = schema;