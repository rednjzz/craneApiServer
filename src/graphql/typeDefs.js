const typeDefs =`
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
  # the schema allows the following query:
  type Query {
    hello: String
    getAllUsers: [User]
    getUserById(id: Int!): User!
    getAllPosts: [Post] 
    getPostById(id: Int!): Post!
  }

  # this schema allows the following mutations:
`;

module.exports = typeDefs;